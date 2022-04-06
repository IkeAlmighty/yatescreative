import Navigation from "../components/Navigation";
import Head from "next/head";
import Markdown from "../components/Markdown";
import clientPromise from "../utils/mongodb";

export default function Home({ poems }) {
  return (
    <div>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
    </div>
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
