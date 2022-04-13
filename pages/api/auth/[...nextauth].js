import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import sha256 from "sha256";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "username", type: "text", placeholder: "hi u" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;

        const mongoClient = await clientPromise;
        const user = await mongoClient
          .db()
          .collection("users")
          .findOne({ username, password: sha256(password) });

        console.log("crypto: ", sha256(password));
        console.log(user);

        return user.isAdmin ? user : null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      const client = await clientPromise;

      let userData = await client
        .db()
        .collection("users")
        .findOne({ email: token.email });

      if (userData?.isAdmin) token.isAdmin = true;

      return token;
    },
    session: async (session, token) => {
      session.isAdmin = token.isAdmin;
      return session;
    },
  },

  session: { jwt: true },
});
