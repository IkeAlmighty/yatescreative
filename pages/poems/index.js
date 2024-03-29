import Navigation from "../../lib/components/Navigation";
import Head from "next/head";
import Markdown from "../../lib/components/Markdown";
import clientPromise from "../../lib/mongodb";

export default function Poems({ poems }) {
  return (
    <>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="content-container">
        <h2>Poetry By Isaac Yates</h2>
        <hr />
        {poems.map((poem) => (
          <div key={poem.timestamp} className="my-40 mb-56 mx-auto text-lg">
            <Markdown markdown={poem.text} />
            <div className="my-3 text-sm text-right">
              {new Date(poem.timestamp).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const poems_unordered = await client
    .db()
    .collection("poems")
    .find({})
    .project({ _id: 0 })
    .toArray();

  const poems = poems_unordered.sort((a, b) => b.timestamp - a.timestamp);

  return { props: { poems } };
}
