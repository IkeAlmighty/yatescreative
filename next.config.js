const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

module.exports = withMDX({
  images: {
    domains: ["yatescreative.s3.us-east-2.amazonaws.com"],
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/api/auth/signin", permanent: true },
      { source: "/login", destination: "/api/auth/signin", permanent: true },
    ];
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});
