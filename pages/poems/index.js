import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Markdown from "../../components/Markdown";

import styles from "./index.module.css";

export default function EditPoem({ poems, session }) {
  const [text, setText] = useState("");
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
    let res = await fetch(`/api/poems/publish`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    if (res.status === 201) {
      let poem = await res.json();
      setPoems([poem, ..._poems]);
    } else {
      alert(`Response Code ${res.status}`);
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

  return (
    <main className="container my-3">
      <div className="row">
        <div className="col mx-auto mb-3">
          <textarea
            className={styles.textBox}
            placeholder=": )"
            onChange={(e) => setText(e.target.value)}
          />
          <button className="d-block" onClick={publish}>
            Publish
          </button>
          <hr />
        </div>

        <div className="col-lg-3 col-sm-12">
          {_poems.map((poem) => (
            <div key={poem.timestamp} className="border mb-3 p-2">
              <div>{new Date(poem.timestamp).toLocaleDateString()}</div>
              <Markdown markdown={poem.text.substring(0, 400)} />
              <button onClick={() => delPoem(poem)}>Delete</button>
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
    .project({ _id: 0 })
    .toArray();

  return { props: { poems, session: await getSession(context) } };
}
