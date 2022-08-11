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

      <div className="with-navbar max-w-3xl mx-auto px-3">
        <div className="mx-auto text-center mt-24 px-1">
          <div className="mx-auto text-left my-6 max-w-3xl">
            <div className="mx-auto my-4 text-4xl">
              I can code your website.
            </div>
            <ul>
              <li>Are you a small business owner or manager?</li>
              <li>Do you need a website?</li>
            </ul>
          </div>
          <div className="bg-black rounded max-w-3xl mx-auto cursor-pointer text-white p-6 text-4xl">
            <Link href="/booking">
              <a>
                Plan a Meeting
                <div className="text-xl mt-3">
                  Website Development &#38; Management
                </div>
              </a>
            </Link>
          </div>

          <div className="mx-auto text-left my-6 max-w-xl"></div>
        </div>
        {/* Freelance Barista CTA */}
        <div className="mx-auto text-center mt-24 px-1">
          <div className="mx-auto text-left my-6 max-w-3xl">
            <div className="mx-auto my-4 text-4xl">
              I can cover your shifts.
            </div>
            <ul>
              <li>Are you a coffeeshop owner or manager?</li>
              <li>In a tight spot schedule-wise?</li>
              <li>Need some time off?</li>
            </ul>
          </div>
          <div className="bg-black rounded max-w-3xl mx-auto cursor-pointer text-white p-6 text-4xl">
            <Link href="/booking">
              <a>
                Schedule Shift
                <div className="text-xl mt-3">Freelance Barista</div>
              </a>
            </Link>
          </div>
          <div className="text-xs my-1">
            &#40; Minneapolis / St. Paul Area Only &#41;
          </div>

          <div className="mx-auto text-left my-6 max-w-xl">
            <div className="my-6">
              I am friendly, a hard worker, and have 3 years of experience in
              3rd Wave coffee. Check out my &nbsp;
              <Link href="https://yatescreative.com/portfolio#art">
                <a className="text-blue-500">latte art portfolio</a>
              </Link>
              &nbsp; or &nbsp;
              <Link href="https://yatescreative.com/contact">
                <a className="text-blue-500">send me a message</a>
              </Link>
              &nbsp; if you have any questions. Feel free to ask for references!
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
        <Link href="/poems">
          <a className="block my-5 md:inline-block md:mx-5">Poetry</a>
        </Link>

        <Link href="/portfolio">
          <a className="block my-5 md:inline-block md:mx-5 md:px-10 md:border-x-2">
            Web Development
          </a>
        </Link>

        <Link href="/thoughts">
          <a className="block my-5 md:inline-block md:mx-5">Random Thoughts</a>
        </Link>
      </div>

      {/* footer */}
      {/* <div className="footer">
        <SocialMediaList />
      </div> */}

      <div className="absolute xl:w-[200px] left-0 top-10 opacity-60">
        <LatteArt />
      </div>
      <Navigation />
    </div>
  );
}
