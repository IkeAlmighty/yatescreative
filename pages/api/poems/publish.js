import { getSession } from "next-auth/client";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session || !session.isAdmin) {
    res.status(401).end("Not Authorized");
    return;
  }
  if (req.method !== "POST") return;

  const client = await clientPromise;
  const { text } = JSON.parse(req.body);
  let timestamp = Date.now();
  let mongoRes = await client
    .db()
    .collection("poems")
    .insertOne({ text, timestamp });

  res.status(201).json({ text, timestamp });
}
