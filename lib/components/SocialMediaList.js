import Link from "next/link";
import Image from "next/image";

export default function SocialMediaList() {
  return (
    <>
      <Link href="https://www.linkedin.com/in/isaac-yates-572441116/">
        <a className="cursor-pointer float-right mx-2">
          <Image
            src="/LI-In-Bug.png"
            layout="fixed"
            width={41}
            height={35}
            alt="LinkedIn"
          />
        </a>
      </Link>

      <Link href="https://www.facebook.com/Yates-Creative-108679831932279">
        <a className="cursor-pointer float-right mx-2">
          <Image
            src="/f_logo_RGB-Grey_58.png"
            layout="fixed"
            width={35}
            height={35}
            alt="Facebook"
          />
        </a>
      </Link>
    </>
  );
}
