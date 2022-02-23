import Markdown from "../../../../components/Markdown";
import clientPromise from "../../../../utils/mongodb";

export default function Article({ markdown }) {
  return <Markdown markdown={markdown} />;
}

export async function getServerSideProps(context) {
  const { title, author } = context.query;

  const client = await clientPromise;

  let article = await client
    .db()
    .collection("articles")
    .findOne({ title, author });

  const markdown = article.markdown;

  return { props: { markdown, title, author } };
}
