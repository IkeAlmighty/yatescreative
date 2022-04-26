import Link from "next/link";
import ThoughtPreviewCard from "../../../lib/components/thoughts/ThoughtPreviewCard";
import clientPromise from "../../../lib/mongodb";
import { serverSide } from "../../../lib/auth";
import { useState } from "react";

export default function ThoughtsAdmin({ articlesData }) {
  const [_articlesData, setArticlesData] = useState(articlesData);

  async function deleteArticle(_id) {
    // first, remove it from the view:
    setArticlesData(_articlesData.filter((a) => a._id !== _id));

    // then remove it from the database:
    let deleteResponse = await fetch(`/api/thoughts/deleteById?_id=${_id}`);

    if (deleteResponse.status !== 204) {
      alert(`status ${deleteResponse.status}: ${await deleteResponse.text()}`);
    }
  }

  return (
    <div className="m-1 md:m-10">
      <Link href="/thoughts/admin/editor">
        <a>
          <button>Create New Article</button>
        </a>
      </Link>

      {_articlesData.map((articleData) => {
        return (
          <div key={articleData._id} className="my-10">
            <ThoughtPreviewCard articleData={articleData} />
            <div>
              <Link href={`/thoughts/admin/editor?_id=${articleData._id}`}>
                <a>
                  <button>Edit</button>
                </a>
              </Link>

              <button onClick={() => deleteArticle(articleData._id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  // redirect if the user is not authorized (development env does not redirect
  if (!(await serverSide.authorized(context))) {
    return { redirect: { destination: "/api/auth/signin" } };
  }

  const client = await clientPromise;

  const articlesData = await client
    .db()
    .collection("thoughts")
    .find({})
    .project({
      _id: { $toString: "$_id" },
      text: true,
      timestamp: true,
      title: true,
      imageKey: true,
    })
    .toArray();

  return { props: { articlesData } };
}
