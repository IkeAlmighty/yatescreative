import Navigation from "../lib/components/Navigation";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import TimeWidget from "../lib/components/TimeWidget";
import SocialMediaList from "../lib/components/SocialMediaList";
import LatteArt from "../lib/components/LatteArt";

export default function Home({ poems }) {
  return (
    <div>
      <Head>
        <title>Yates Creative</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="freelance-webdev"></div>

      <div className="with-navbar max-w-3xl mx-auto px-3">
        <div className="mx-auto text-center mt-24 px-1">
          <div className="mx-auto text-left my-6 max-w-3xl">
            <div className="mx-auto my-4 text-4xl">Custom Web Pages</div>
            <div className="my-3 font-bold">
              Feel free to contact me for general web development help! I am open to trades in place of monetary compesation.
            </div>
          </div>
          <div className="bg-black rounded max-w-3xl mx-auto cursor-pointer text-white p-6 text-4xl">
            <Link href="/booking">
              <a>
                Meet with Me
                <div className="text-xl mt-3">
                  Website Development &#38; Management
                </div>
              </a>
            </Link>
          </div>

          <div className="mx-auto text-left my-6 max-w-xl">
            <div className="my-6">
              I am a junior level full stack website developer, with 10+ years
              of hobby coding experience under my belt. This website was
              handcrafted by me using popular web development technologies.
            </div>
          </div>
        </div>

        {/* self portrait */}
        <Image
          src="/portraits/IMG_7492.jpg"
          layout="responsive"
          width={3648}
          height={5107}
          alt="picture of Isaac Yates"
          priority={true}
          className="hidden md:visible"
        />
      </div>

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
        <Link href="/portfolio#art">
          <a className="block my-5 md:inline-block md:mx-5">Coffee</a>
        </Link>

        <Link href="/portfolio">
          <a className="block my-5 md:inline-block md:mx-5 md:px-10 md:border-l-2">
            Web Development
          </a>
        </Link>
      </div>

      <div className="absolute xl:w-[200px] left-0 top-10 opacity-60">
        <LatteArt />
      </div>
      <Navigation />
    </div>
  );
}
