import { getSession } from "next-auth/client";
import clientPromise from "../../utils/mongodb";

export default function ThoughtsAdmin({ articleData }) {
  return <div></div>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || !session.isAdmin) {
    return { redirect: { destination: "/api/auth/signin" } };
  }

  const client = await clientPromise;

  const articleData = await client
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

  return { props: { articleData } };
}
