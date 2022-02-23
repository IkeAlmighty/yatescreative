import Navigation from "../components/Navigation";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import ArtTile from "../components/ArtTile";
import EventTile from "../components/EventTile";
import Markdown from "../components/Markdown";
import clientPromise from "../utils/mongodb";

export default function Home({ poems }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {poems.map((poem) => (
        <div key={poem.timestamp}>
          <p>{poem.text}</p>
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
