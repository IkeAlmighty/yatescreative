import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let doc = JSON.parse(req.body);
  doc._id = ObjectId(doc._id);

  console.log("doc to save", doc);

  const client = await clientPromise;

  const mongoUpdateResponse = await client
    .db()
    .collection("thoughts")
    .updateOne({ _id: doc._id }, { $set: doc });

  res.end();
}
