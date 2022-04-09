export default function ThoughtPreviewCard(articleData) {
  return (
    <div className="h-[300px] w-[300px] border-4 px-6">
      <h1>{articleData.title || "Untitled"}</h1>
    </div>
  );
}
