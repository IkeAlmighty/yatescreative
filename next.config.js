module.exports = {
  images: {
    domains: ["yatescreative.s3.us-east-2.amazonaws.com"],
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/api/auth/signin", permanent: true },
      { source: "/login", destination: "/api/auth/signin", permanent: true },
    ];
  },
};
