import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { _id } = req.query;

  const client = await clientPromise;

  const mongoDeleteResponse = await client
    .db()
    .collection("thoughts")
    .deleteOne({ _id: ObjectId(_id) });

  if (mongoDeleteResponse.deletedCount === 0) {
    res.status(400).send("Server error: no docs were deleted");
  }

  res.status(204).end(); //TODO: add custom error messages
}
