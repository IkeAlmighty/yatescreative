import Navigation from "../components/Navigation";
import Head from "next/head";
import Image from "next/image";
import clientPromise from "../utils/mongodb";
import TimeWidget from "../components/TimeWidget";

export default function Home({ poems }) {
  return (
    <div>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="with-navbar">
        {/* 
        FIXME: Need to find a different image, 
        I don't have the liscense on this one 
        */}
        <Image
          src="/banana.jpg"
          layout="responsive"
          width={680}
          height={453}
          alt=""
        />
      </div>
      <div className="fixed bottom-0 left-0 w-full opacity-90 bg-slate-100">
        <TimeWidget />
      </div>

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
