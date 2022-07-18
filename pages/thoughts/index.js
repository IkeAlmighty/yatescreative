import Navigation from "../../lib/components/Navigation";
import ThoughtPreviewCard from "../../lib/components/thoughts/ThoughtPreviewCard";

import Link from "next/link";

export default function Index() {
  const articleDataList = [
    // {
    //   title: "Why Work in Software?",
    //   description:
    //     "Read my thoughts on being a sofware developer, and how I find meaning in my work.",
    //   slug: "motivations",
    // },
  ];

  return (
    <div className="content-container">
      {articleDataList.map((articleData) => {
        return (
          <div key={articleData.slug} className="border-b-2 py-3">
            <h2>{articleData.title}</h2>
            <div>{articleData.description}</div>
            <div className="mt-10 inline-block text-2xl text-blue-400 border-2 p-3">
              <Link href={`thoughts/${articleData.slug}`}>
                <a>Read</a>
              </Link>
            </div>
          </div>
        );
      })}

      <Navigation />
    </div>
  );
}
