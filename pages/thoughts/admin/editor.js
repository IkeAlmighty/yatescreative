import { useState, useEffect } from "react";
import S3Upload from "../../../lib/components/S3Upload";
import clientPromise from "../../../lib/mongodb";
import marked from "marked";
import { ObjectId } from "mongodb";

export default function ThoughtsEditor({ articleData }) {
  const [markdown, setMarkdown] = useState(articleData?.markdown || "");
  const [title, setTitle] = useState(articleData?.title || "");
  const [imageKeys, setImageKeys] = useState(articleData?.imageKeys || []);

  const [showMd, setShowMd] = useState(true);

  const [savePending, setSavePending] = useState(false);

  function createMarkdown() {
    const rawMarkup = marked(markdown);
    return { __html: rawMarkup };
  }

  function addImageKey(key) {
    // add it to the image key display:
    setImageKeys([...imageKeys, key]);

    // update the draft in the database:
  }

  async function saveArticle() {
    const doc = {
      _id: articleData._id,
      markdown,
      title,
      imageKeys,
    };
    let response = await fetch("/api/thoughts/upsert", {
      method: "POST",
      body: JSON.stringify(doc),
    });

    if (response.status >= 400) {
      alert(`Status ${response.status}! Server Error`);
    }
  }

  useEffect(() => {
    // add an event to look for keyboard presses
    window.addEventListener("keydown", () => {
      setSavePending(true);

      console.log("starting timeout");

      setTimeout(async () => {
        console.log("save check", savePending);
        if (savePending) {
          console.log("savin");
          await saveArticle();
          setSavePending(false);

          console.log("saveing!!!!");
        }
      }, 1000);
    });
  }, []);

  return (
    <div>
      {/* Preview Toggle */}
      <div className="max-w-3xl mx-auto p-3">
        <button className="p-2" onClick={() => setShowMd(!showMd)}>
          {showMd ? "Preview Mode" : "Markdown Mode"}
        </button>
      </div>

      {/* Title Field */}
      <div className={`${showMd ? "block" : "hidden"} max-w-3xl mx-auto p-3`}>
        <input
          type="text"
          className="border-2"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Markdown TextArea */}
      <div
        className={`${
          showMd ? "block" : "hidden"
        } flex flex-grow h-[700px] max-w-3xl mx-auto p-3`}
      >
        <textarea
          className="block border-2 p-3 w-full h-full"
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="## Markdown"
        ></textarea>
      </div>

      {/* Additional Buttons */}
      <div className={`${showMd ? "block" : "hidden"} max-w-3xl mx-auto p-3`}>
        <S3Upload
          label="Upload a Photo to Use"
          onUpload={(key) => addImageKey(key)}
          className="hover:cursor-pointer"
        />
        <span className="my-6"> Image Keys:</span>
        {imageKeys.map((key) => (
          <span className="border-l-2 border-slate-600 px-3 mx-3" key={key}>
            {key}
          </span>
        ))}
      </div>

      {/* Preview Pane */}
      <div className={`${showMd ? "hidden" : "block"} max-w-3xl mx-auto p-3`}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={createMarkdown()} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {
    query: { _id },
  } = context;

  const client = await clientPromise;

  let articleData = { markdown: "", title: "", imageKeys: "", draft: true };

  if (!_id) {
    // if there is no _id specified, assume we are creating a new doc,
    // and then reload with the right _id query:
    let mongoInsertRes = await client
      .db()
      .collection("thoughts")
      .insertOne(articleData);

    return {
      redirect: {
        destination: `/thoughts/admin/editor?_id=${mongoInsertRes.insertedId.toString()}`,
      },
    };
  }

  // else proceed with existing doc:
  articleData = await client
    .db()
    .collection("thoughts")
    .findOne({ _id: ObjectId(_id) }, { $project: { _id: 0 } });

  articleData._id = _id;

  console.log(articleData);

  return { props: { articleData } };
}
