import Link from "next/link";

export default function PortfolioCard({
  title,
  deploymentLink,
  description,
  githubLink,
}) {
  return (
    <>
      <Link href={deploymentLink}>
        <a className="hover:text-blue-400">
          <h2 className="pt-5">{title}</h2>

          <div className="border-2 rounded border-black">
            {/* display an uneditable iframe of website */}
            <iframe
              src={deploymentLink}
              className="w-full h-[200px] overflow-hidden"
              scrolling="no"
            />
          </div>
        </a>
      </Link>

      <p>{description}</p>

      <div>
        <Link href={githubLink}>
          <a className="hover:text-blue-600 font-bold">Click Here</a>
        </Link>
        &nbsp;for Github Repository
      </div>
    </>
  );
}
