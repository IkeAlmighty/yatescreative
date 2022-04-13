import Navigation from "../../lib/components/Navigation";
import ThoughtPreviewCard from "../../lib/components/thoughts/ThoughtPreviewCard";
import clientPromise from "../../lib/mongodb";
import S3Image from "../../lib/components/S3Image";

export default function Index({ articleData }) {
  return (
    <div className="content-container">
      {articleData.map((articleData) => (
        <div key={articleData._id} className="m-3">
          <ThoughtPreviewCard articleData={articleData} />
        </div>
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
    .find({ draft: false })
    .project({
      _id: { $toString: "$_id" },
      markdown: true,
      timestamp: true,
      title: true,
      imageKey: true,
    })
    .toArray();

  console.log(articleData);

  return { props: { articleData } };
}
