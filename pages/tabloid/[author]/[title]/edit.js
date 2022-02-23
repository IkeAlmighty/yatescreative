// TODO
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Markdown from "../../../../components/Markdown";
import { getServerSideProps as _getServerSideProps } from "./index";
import styles from "./edit.module.css";

export default function EditArticle({ markdown, title, author, isAdmin }) {
  const [_markdown, set_markdown] = useState(markdown || `# ${title}\n\n`);
  const [_title, set_title] = useState(title || getParsedTitle());
  const [editable, setEditable] = useState(true);

  const lastEditTimeStamp = useRef(undefined);

  function getParsedTitle() {
    let stringBuffer = "";
    let titleStartFound = false;
    for (let i = 0; i < _markdown.length; i++) {
      const char = _markdown.charAt(i);
      switch (char) {
        case "#":
          titleStartFound = true;
          break;
        case "\n":
          if (titleStartFound) {
            return stringBuffer.trim();
          }
          break;
        default:
          if (titleStartFound) {
            stringBuffer += char;
          }
          break;
      }
    }

    return "Untitled";
  }

  async function publish() {}

  async function saveArticle(t, a, m) {
    const body = JSON.stringify({
      mongo: {
        collection: "articles",
        query: { title: t, author: a },
        document: { title: t, author: a, markdown: m },
      },
    });

    let res = await fetch(`http://localhost:3000/api/db/mongodb`, {
      method: "PATCH",
      body,
    });

    // console.log(res);
  }

  // The following useEffect is used
  // to auto save the document when the
  // user has stopped typing for a couple seconds.
  useEffect(() => {
    lastEditTimeStamp.current = Date.now();

    setTimeout(async () => {
      if (lastEditTimeStamp.current) {
        // console.log(Date.now(), lastEditTimeStamp.current);
        if (Date.now() - lastEditTimeStamp.current >= 900) {
          console.log("saving article as ", _markdown);
          await saveArticle(_title, author, _markdown);
          console.log("saved");
          lastEditTimeStamp.current = undefined;
          return;
        }
      }
    }, 1000);
  }, [_markdown]);

  setInterval(async () => {
    await saveArticle(_title, author, _markdown);
  }, 30000);

  if (!isAdmin) return <div>You are not authorized to view this page.</div>;

  return (
    <div>
      <Head>
        <title>YC | {_title}</title>
      </Head>

      <div className={styles.markdownContainer}>
        <Markdown
          markdown={_markdown}
          editorClassName="p-1 w-100 h-100"
          editable={editable}
          onEdit={(value) => {
            set_markdown(value);
            set_title(getParsedTitle());
          }}
        />
        <div className={styles.controlPanel}>
          <input
            type="button"
            value={editable ? "View HTML" : "View Markdown  "}
            onClick={() => {
              setEditable(!editable);
            }}
          />
          <input type="button" value="Add Image" />
          <input
            style={{ color: "green" }}
            type="button"
            value="|  Publish  |"
            onClick={publish}
          />
          <input style={{ color: "red" }} type="button" value="  Delete  " />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const isAdmin = session?.isAdmin;

  const { title, author } = context.query;

  const client = await clientPromise;

  let article = await client
    .db()
    .collection("articles")
    .findOne({ title, author });

  const markdown = article.markdown;

  return { props: { markdown, title, author, isAdmin } };
}
