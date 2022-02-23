import clientPromise from "../../../utils/mongodb";

export default async (req, res) => {
  const { name, email, phone } = JSON.parse(req.body);

  if (name === undefined || email === undefined) {
    res.status(400).send(`name and email are required`);
    return;
  }

  // connect to db
  const client = await clientPromise;

  // check to see if user with email exists, if it does respond
  // with an error status:
  if (
    await client
      .db()
      .collection("users")
      .findOne({ email: email.toLowerCase() })
  ) {
    res.status(400).send(`A user with email ${email} already exists`);
    return;
  }

  // create user in db from body
  await client
    .db()
    .collection("users")
    .insertOne({ name, email: email.toLowerCase(), phone });

  // respond
  res.status(200).end();
};
