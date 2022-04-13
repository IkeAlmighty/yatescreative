import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  let doc = JSON.parse(req.body);
  delete doc._id;

  const client = await clientPromise;

  const mongoUpsertResponse = await client
    .db()
    .collection("thoughts")
    .updateOne({ _id: ObjectId(doc._id) }, { $set: doc }, { upsert: true });

  res.end();
}
