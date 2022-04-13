import { getSession } from "next-auth/client";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.isAdmin) {
    res.status(401).end("Not Authorized");
    return;
  }
  if (req.method !== "PATCH") return;

  const client = await clientPromise;
  const { text, _id } = JSON.parse(req.body);
  let mongoRes = await client
    .db()
    .collection("poems")
    .updateOne({ _id: new ObjectId(_id) }, { $set: { text } });

  res.status(204).json({ text, _id });
}
