import Image from "next/image";
import { useState, useEffect } from "react";

export default function ArtTile({ imageKey, className }) {
  const [imageURL, setImageURL] = useState("/");

  useEffect(async () => {
    let res = await fetch(`/api/s3/signedURL?key=${imageKey}`);
    setImageURL(await res.text());
  }, [imageKey]);

  const defaultStyle = {
    border: "2px solid black",
    width: "100%",
    height: "100%",
    position: "relative",
  };

  return (
    <div className={`${className}`} style={defaultStyle}>
      {/* FIXME: Image tag causes error res.hasHeader is not a function */}
      {/* <Image
        layout="fill"
        objectFit="contain"
        src={imageURL}
        alt="not loaded"
      /> */}
    </div>
  );
}
