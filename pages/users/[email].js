import clientPromise from "../../utils/mongodb";

export default function User({ user }) {
  return (
    <div>{user.name ? user.name : `No user with email ${user.email}`}</div>
  );
}

export async function getServerSideProps(context) {
  const { email } = context.query;
  const client = await clientPromise;

  let user = await client.db().collection("users").findOne({ email });
  delete user._id;

  return { props: { user: user ? user : { email } } };
}
