import { getSession } from "next-auth/client";
import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.isAdmin) {
    res.status(401).end("Not Authorized");
    return;
  }
  if (req.method !== "DELETE") return;

  const client = await clientPromise;
  const { poem } = JSON.parse(req.body);
  let mongoRes = await client.db().collection("poems").deleteOne(poem);

  res.status(201).end();
};
