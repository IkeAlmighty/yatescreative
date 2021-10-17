// https://github.com/vercel/next.js/issues/25454#issuecomment-903513941
// ^ fix for react markdown taken from here

const withTM = require("next-transpile-modules")(["react-markdown"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["ibb.co", "i.ibb.co"],
  },
});
