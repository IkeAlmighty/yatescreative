import Navigation from "../components/Navigation";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Markdown from "../components/Markdown";
import clientPromise from "../utils/mongodb";

export default function Home({ poems }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Poetry By Isaac Yates</h2>
      <hr />
      {poems.map((poem) => (
        <div key={poem.timestamp}>
          <div>{new Date(poem.timestamp).toLocaleDateString()}</div>
          <Markdown markdown={poem.text} />
        </div>
      ))}
      <Navigation />
    </div>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const poems = await client
    .db()
    .collection("poems")
    .find({})
    .project({ _id: 0 })
    .toArray();

  return { props: { poems } };
}
