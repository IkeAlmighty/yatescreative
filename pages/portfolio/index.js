import Navigation from "../../lib/components/Navigation";
import PortfolioCard from "../../lib/components/portfolio/PortfolioCard";
import Link from "next/link";

export default function Portfolio() {
  return (
    <div>
      <div className="with-navbar">
        <div className="my-6 max-w-lg md:p-0 p-2 mx-auto">
          <div className="pt-10 pb-6 mb-20 border-b-2 border-black">
            <h1 className="mb-1">Website Development Portfolio</h1>
            <h3>Isaac Yates</h3>
            <a href="/resume.pdf" download>
              <div className="text-blue-600 text-right">
                (click here for resume)
              </div>
            </a>
          </div>

          <p className="text-left tracking-wide">
            In addition to the following websites, yatescreative.com (this
            website) has public source code that can be viewed on github
            via&nbsp;
            <Link href="https://github.com/IkeAlmighty/yatescreative/">
              <a className="text-blue-500 inline-block">this link</a>
            </Link>
          </p>

          <PortfolioCard
            deploymentLink="https://clockinout.vercel.app/"
            title="Clock In/Out"
            description="A time tracking app."
            githubLink="https://github.com/IkeAlmighty/clockinout"
          />
          <hr className="my-20" />
          <PortfolioCard
            deploymentLink="https://takeikesstuff.vercel.app/"
            title="Take My Stuff"
            description="A web app for giving away my random items."
            githubLink="https://github.com/IkeAlmighty/takeikesstuff"
          />
          <hr />
        </div>
      </div>

      <Navigation />
    </div>
  );
}
