import Markdown from "../../../../components/Markdown";
import clientPromise from "../../../../utils/mongodb";

export default function EditDocument({ document }) {
  return (
    <>
      <Markdown markdown={document?.markdown} />
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const { series, chapter } = context.query;

  let document = await client
    .db()
    .collection("fiction")
    .findOne({ chapter, series });

  delete document._id;

  return { props: { document: document ? document : {} } };
}
