import { getSession } from "next-auth/client";
import Link from "next/link";
import ThoughtPreviewCard from "../../../lib/components/thoughts/ThoughtPreviewCard";
import clientPromise from "../../../lib/mongodb";

export default function ThoughtsAdmin({ articlesData }) {
  return (
    <div className="m-1 md:m-10">
      <Link href="/thoughts/admin/editor">
        <a>
          <button>Create New Article</button>
        </a>
      </Link>

      {articlesData.map((articleData) => {
        return (
          <div key={articleData._id}>
            <ThoughtPreviewCard articleData={articleData} />
            <div>
              <Link href={`/thoughts/admin/editor?_id=${articleData._id}`}>
                <a>
                  <button>Edit</button>
                </a>
              </Link>

              <button>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.isAdmin) {
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
