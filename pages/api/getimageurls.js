import {connectToDatabase} from "../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({error: "/getImageURL only takes get requests"});
    return;
  }

  try {
    let {db} = await connectToDatabase();
    let mongoRes = await db.collection("imageData").find({});
    res.status(200).json({urls: mongoRes.data});
  } catch (err) {
    console.log(err);
  }
}
