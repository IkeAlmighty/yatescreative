import Markdown from "../Markdown";

export default function ThoughtPreviewCard({ articleData }) {
  return (
    <div className="h-[150px] w-[300px] border-4 px-6">
      <h1>{articleData.title || "Untitled"}</h1>
      <Markdown markdown={articleData.markdown?.substr(0, 30) || ""} />
    </div>
  );
}
