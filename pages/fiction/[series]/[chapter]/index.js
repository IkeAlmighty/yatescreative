import Markdown from "../../../../components/Markdown";
import clientPromise from "../../../../utils/mongodb";

export default function Chapter({ series, chapter, markdown }) {
  return <Markdown markdown={markdown} />;
}

export async function getServerSideProps(context) {
  const { series, chapter } = context.query;

  const client = await clientPromise;

  let res = await client
    .db()
    .collection("fiction")
    .findOne({ series, chapter });

  return { props: { series, chapter, markdown: res.markdown } };
}
