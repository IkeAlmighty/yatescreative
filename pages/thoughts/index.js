import Navigation from "../../lib/components/Navigation";
import clientPromise from "../../utils/mongodb";

export default function Index({ articleData }) {
  return (
    <div className="content-container">
      {articleData.map((articleData) => (
        <div key={articleData._id}></div>
      ))}

      <Navigation />
    </div>
  );
}

export async function getServerSideProps() {
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
