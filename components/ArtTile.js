import Image from "next/image";

export default function ArtTile({imageURL}) {
  const style = {
    padding: "20px",
  };
  return (
    <div>
      <div className={style}>
        <Image
          layout="fill"
          objectFit="contain"
          src={imageURL}
          alt="not loaded"
        />
      </div>
    </div>
  );
}
