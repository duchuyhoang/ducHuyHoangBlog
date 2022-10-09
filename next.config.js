/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["about.gitlab.com"],
  },
};
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    providerImportSource: "@mdx-js/react",
  },
  images: {
    domains: ["about.gitlab.com"],
  },
});
const withTM = require("next-transpile-modules")([
  "gsap",
  "hover-effect",
  "react-syntax-highlighter"
]);
module.exports = withTM(withMDX({
  // Append the default value with md extensions
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    domains: ["about.gitlab.com"],
  },
}));
