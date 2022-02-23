import { getSession } from "next-auth/client";
import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { method } = req;
  if (method === "PATCH") {
    const session = await getSession({ req });
    if (!session || !session.isAdmin) {
      res.status(401).end("You are not authorized to send patch requests.");
      return;
    }

    const {
      mongo: { query, document, collection },
    } = JSON.parse(req.body);

    console.log(query, document, collection);

    const client = await clientPromise;
    let mongoRes = await client
      .db()
      .collection(collection)
      .updateOne(query, { $set: document });

    // console.log(mongoRes);

    res.status(201).end();
  } else if (method === "POST") {
    post(req, res);
  } else if (method === "GET") {
    const client = await clientPromise;

    const { collection, query, limit } = req.params;

    const mongores = await client
      .db()
      .collection(collection)
      .find(query ? query : {})
      .limit(limit ? limit : 1)
      .toArray();

    if (!limit || parseInt(limit) === 1) {
      res.json(mongores[0]);
    } else {
      res.json(mongores);
    }
  } else if (method === "DELETE") {
    del(req, res);
  }
};
