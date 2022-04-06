import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Markdown from "../../components/Markdown";

import styles from "./index.module.css";

export default function EditPoem({ poems, session }) {
  const [text, setText] = useState("");
  const markdownBox = useRef(null);

  const [editId, setEditId] = useState(undefined);

  const [_poems, setPoems] = useState(poems);

  const router = useRouter();

  useEffect(() => {
    if (!session || !session.isAdmin) {
      router.push("/api/auth/signin");
    }
  }, []);

  if (!session || !session.isAdmin) {
    return <div>Unauthorized! Redirecting to Login...</div>;
  }

  async function publish() {
    if (editId === undefined) {
      let createResponse = await fetch(`/api/poems/publish`, {
        method: "POST",
        body: JSON.stringify({ text }),
      });

      if (createResponse.status === 201) {
        let poem = await createResponse.json();
        setPoems([poem, ..._poems]);
      } else {
        alert(`Response Code ${createResponse.status}`);
      }
    } else {
      // If there is an edit Id set, then we are editing a poem, not creating one:
      let updateResponse = await fetch(`/api/poems/update`, {
        method: "PATCH",
        body: JSON.stringify({ text, _id: editId }),
      });

      if (updateResponse.status === 204) {
        // change the poem's visuals so we don't have to reload the page:

        setPoems(
          _poems.map((poem) => {
            if (poem._id === editId) {
              return { text, _id: poem._id, timestamp: poem.timestamp };
            } else return poem;
          })
        );

        // reset the edit box values
        markdownBox.current.value = "";
        setText("");
        setEditId(undefined); // back to create-poem-mode
      } else {
        alert(`Response Code ${updateResponse.status}`);
      }
    }
  }

  async function delPoem(poem) {
    let res = await fetch("/api/poems/delete", {
      method: "DELETE",
      body: JSON.stringify({ poem }),
    });

    if (res.status === 201) {
      setPoems(_poems.filter((p) => p.text !== poem.text));
    }
  }

  function editPoem(poem) {
    setText(poem.text);
    markdownBox.current.value = poem.text;
    setEditId(poem._id);

    //scroll to the edit area:
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  return (
    <main className="mx-3 my-3">
      <div className="row">
        <div className="col mx-auto mb-3">
          <textarea
            className={styles.textBox}
            ref={markdownBox}
            placeholder=": )"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="block" onClick={publish}>
            {editId ? "Update" : "Publish"}
          </button>
          <hr />
        </div>

        <div className="flex flex-wrap">
          {_poems.map((poem) => (
            <div key={poem.timestamp} className="border mx-6 mb-3 p-2 w-96">
              <div className="mb-10">
                <button onClick={() => delPoem(poem)}>Delete</button>
                <button onClick={() => editPoem(poem)}>Edit</button>
              </div>
              <div>
                <div>{new Date(poem.timestamp).toLocaleDateString()}</div>
                <Markdown markdown={poem.text.substring(0, 400)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  let poems = await client
    .db()
    .collection("poems")
    .find({})
    .project({ _id: { $toString: "$_id" }, text: 1, timestamp: 1 })
    .toArray();

  return { props: { poems, session: await getSession(context) } };
}
