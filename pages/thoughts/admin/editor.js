import { useState, useEffect, useRef } from "react";
import S3Upload from "../../../lib/components/S3Upload";
import clientPromise from "../../../lib/mongodb";
import marked from "marked";
import renderer from "../../../lib/marked-s3image-renderer";
import { ObjectId } from "mongodb";
import { serverSide } from "../../../lib/auth";
import { fetchImageUrl } from "../../../lib/s3";

/**
 * This renderer integrates with s3 images.
 * Used in tandem with sessionStorage, and doesn't work without
 * setting the value of 'marked-s3-image-map', which
 * this component does via useEffect hook.
 *  */
marked.use({ renderer });

export default function ThoughtsEditor({ articleData }) {
  // despite having ref objects for these two, we still render
  // title and markdown in preview mode, so we have to add useState vars:
  const [markdown, setMarkdown] = useState(articleData?.markdown || "");
  const [title, setTitle] = useState(articleData?.title || "");

  const [imageKeys, setImageKeys] = useState(articleData?.imageKeys || []);

  // These ref objects are used so that we can make prefill
  // data to these elements from the database on page load:
  const markdownElement = useRef();
  const titleElement = useRef();

  useEffect(() => {
    // prefill articleData:
    markdownElement.current.value = articleData?.markdown || "";
    titleElement.current.value = articleData?.title || "";
  }, []);

  const [showMd, setShowMd] = useState(true);

  // This is needed to allow dynamic image fetches from
  // Amazon S3 to work with marked.
  useEffect(() => {
    // grab the urls for each imagekey, and
    // then make them available to marked
    // by storing them in sessionStorage:
    async function storeImageUrls() {
      const imageMap = {};

      for (let i = 0; i < imageKeys.length; i++) {
        const key = imageKeys[i];
        const apiResponse = await fetchImageUrl(key);
        imageMap[key] = apiResponse.url;
      }

      sessionStorage.setItem("marked-s3-image-map", JSON.stringify(imageMap));
    }

    // this is ran each time to update the imageKeys in the database
    async function updateImageKeys() {
      // update the draft in the database:
      const doc = { imageKeys };

      let response = await fetch("/api/thoughts/updateById", {
        method: "POST",
        body: JSON.stringify(doc),
      });

      if (response.status >= 400) {
        alert(`Status ${response.status}! Server Error`);
      }
    }

    storeImageUrls();
    updateImageKeys();
  }, [imageKeys]);

  function createMarkdown() {
    const rawMarkup = marked.parse(markdown);
    return { __html: rawMarkup };
  }

  async function addImageKey(key) {
    // add it to the image key display:
    setImageKeys([...imageKeys, key]);
  }

  async function saveArticle() {
    const doc = {
      _id: articleData._id,
      markdown,
      title,
      imageKeys,
    };

    let response = await fetch("/api/thoughts/updateById", {
      method: "POST",
      body: JSON.stringify(doc),
    });

    if (response.status >= 400) {
      alert(`Status ${response.status}! Server Error`);
    }
  }

  return (
    <div>
      {/* Preview Toggle */}
      <div className="max-w-3xl mx-auto p-3">
        <button className="p-2" onClick={() => setShowMd(!showMd)}>
          {showMd ? "Preview Mode" : "Markdown Mode"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-3">
        <button className="p-2" onClick={async () => await saveArticle()}>
          Save
        </button>
      </div>

      {/* Title Field */}
      <div className={`${showMd ? "block" : "hidden"} max-w-3xl mx-auto p-3`}>
        <input
          type="text"
          className="border-2"
          placeholder="Title"
          ref={titleElement}
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
          ref={markdownElement}
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
  // redirect if the user is not authorized (development env does not redirect)
  if (!(await serverSide.authorized(context))) {
    return { redirect: { destination: "/api/auth/signin" } };
  }

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

  return { props: { articleData } };
}
