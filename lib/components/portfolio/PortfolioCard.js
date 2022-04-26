import Link from "next/link";
import Image from "next/image";

export default function PortfolioCard({
  title,
  deploymentLink,
  imgSrc,
  description,
  githubLink,
}) {
  return (
    <>
      <Link href={deploymentLink}>
        <a className="hover:text-blue-400">
          <h2 className="pt-5">{title}</h2>

          <div className="border-2 rounded border-black">
            <Image
              src={imgSrc}
              width={369}
              height={112}
              layout="responsive"
              alt={`${title} portfolio image`}
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
