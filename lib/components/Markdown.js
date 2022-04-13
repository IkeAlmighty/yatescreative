import marked from "marked";

export default function Markdown({ markdown, className }) {
  function getMarkdownText() {
    const rawMarkup = marked(markdown || "");
    return { __html: rawMarkup };
  }

  return (
    <div className={className} dangerouslySetInnerHTML={getMarkdownText()} />
  );
}
