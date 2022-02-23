import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "../../../utils/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      if (user) {
        const client = await clientPromise;

        let userData = await client
          .db()
          .collection("users")
          .findOne({ email: user.email });

        if (userData?.isAdmin) token.isAdmin = true;
      }

      return token;
    },
    session: async (session, token) => {
      session.isAdmin = token.isAdmin;
      return session;
    },
  },

  session: { jwt: true },
});
