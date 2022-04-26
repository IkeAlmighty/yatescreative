import Navigation from "../lib/components/Navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TimeWidget from "../lib/components/TimeWidget";

export default function Home({ poems }) {
  return (
    <div>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="with-navbar max-w-3xl mx-auto">
        <div className="text-center pt-20">
          <Image
            src="/android-chrome-192x192.png"
            layout="fixed"
            width={192}
            height={192}
            alt="YC"
          />
        </div>

        <div className="text-center md:text-lg my-10">
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

        {/* self portrait */}
        <Image
          src="/portraits/IMG_7530.jpg"
          layout="responsive"
          width={3648}
          height={5107}
          alt="picture of Isaac Yates"
          priority={true}
          className="hidden md:visible"
        />
      </div>

      {/* footer */}
      {/* <div className="footer">
        <TimeWidget />
      </div> */}

      <Navigation />
    </div>
  );
}
