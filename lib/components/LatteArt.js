import Image from "next/image";

export default function LatteArt() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7].reverse().map((filename, index) => (
        <div
          key={`${filename}-latteart`}
          className="w-full h-[300px] relative bg-black"
        >
          <Image
            src={`/latteart/${filename.toString()}.jpg`}
            layout="fill"
            objectFit="contain"
            alt={`latte art #${filename}`}
            className={`inline-block ${
              index % 2 === 0 ? "bg-black" : "bg-slate-900"
            }`}
          />
        </div>
      ))}
    </>
  );
}
