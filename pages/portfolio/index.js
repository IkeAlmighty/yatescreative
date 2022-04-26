import Navigation from "../../lib/components/Navigation";
import PortfolioCard from "../../lib/components/portfolio/PortfolioCard";
import Link from "next/link";

export default function Portfolio() {
  return (
    <div>
      <div className="with-navbar">
        <div className="my-6 max-w-lg md:p-0 p-2 mx-auto">
          <div className="pt-10 pb-6 mb-20 border-b-2 border-black">
            <h1>Isaac Yates</h1>
            <div>Website Development Portfolio</div>
            <a href="/resume.pdf" download>
              <div className="text-blue-600">(click here for resume)</div>
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
            deploymentLink="https://norman.events"
            imgSrc="/headernormanevents.png"
            title="norman.events"
            description="Norman Events is a local event aggregator for my home town, Norman,
            Oklahoma."
            githubLink="https://github.com/IkeAlmighty/norman.events"
          />
          <hr className="my-20" />
          <PortfolioCard
            deploymentLink="https://grayowl.coffee"
            imgSrc="/headergrayowlcoffee.png"
            title="grayowl.coffee"
            description="A simple landing page for the coffee shop I work at, Gray Owl Coffee."
            githubLink="https://github.com/IkeAlmighty/grayowlcoffee"
          />
          <hr />
        </div>
      </div>

      <Navigation />
    </div>
  );
}
