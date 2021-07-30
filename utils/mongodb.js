import {MongoClient} from "mongodb";

const MONGO_URI = process.env.MONGO_URI;

let conn = null;
let db = null;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export async function connectToDatabase() {
  if (!conn) {
    try {
      await new MongoClient.connect(MONGO_URI, options).then((client) => {
        conn = client;
        db = client.db();
      });
    } catch (err) {
      console.log(err);
    }
  }

  return {conn, db};
}
