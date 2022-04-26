// This is written to allow development environment
// to skip authentication, as well as redirect to auth
// when needed in production

import { getSession } from "next-auth/client";

// it wraps a couple functions from the next-auth/client lib.

export const serverSide = {
  authorized: async (context) => {
    // Meant to be used inside of getServerSideProps. Example of redirect:

    // if (!(await serverSide.authorized(context))) {
    //   return { redirect: { destination: "/api/auth/signin" } };
    // }

    // CODE:
    if (process.env.NODE_ENV === "development") {
      return true;
    }

    const session = await getSession(context);

    return session && session.isAdmin;
  },
};
