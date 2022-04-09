import Navigation from "../lib/components/Navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import clientPromise from "../lib/mongodb";
import TimeWidget from "../lib/components/TimeWidget";

export default function Home({ poems }) {
  return (
    <div>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="with-navbar with-footer">
        <Image
          src="/banana.jpg"
          layout="responsive"
          width={680}
          height={453}
          alt=""
          priority={true}
          className="hidden md:visible"
        />

        <div className="md:hidden">
          <Image
            src="/banana.jpg"
            layout="responsive"
            width={453}
            height={453}
            alt=""
            priority={true}
            className="rotate-90"
          />
        </div>

        <div className="md:hidden">
          <Image
            src="/banana.jpg"
            layout="responsive"
            width={680}
            height={453}
            alt=""
            priority={true}
            className="rotate-180"
          />
        </div>

        <div className="md:hidden">
          <Image
            src="/banana.jpg"
            layout="responsive"
            width={453}
            height={453}
            alt=""
            priority={true}
            className="-rotate-90 "
          />
        </div>

        <div className="text-center pt-20">
          <Image
            src="/android-chrome-192x192.png"
            layout="fixed"
            width={192}
            height={192}
            alt=""
          />
        </div>

        <div className="text-center md:text-lg mt-10">
          <Link href="/poems">
            <a className="block my-5 md:inline-block md:mx-5">Poetry</a>
          </Link>

          <Link href="/portfolio">
            <a className="block my-5 md:inline-block md:mx-5 md:px-10 md:border-x-2">
              Web Development
            </a>
          </Link>

          <Link href="/thoughts">
            <a className="block my-5 md:inline-block md:mx-5">
              Random Thoughts
            </a>
          </Link>
        </div>
      </div>

      {/* footer */}
      <div className="footer">
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
