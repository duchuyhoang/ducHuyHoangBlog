import React from "react";
import fs from "fs";
import path from "path";
import { GetStaticProps, NextPageContext } from "next";
export async function getStaticPaths() {
//   console.log(path.join("posts"));
  //   const fileList = fs.readdirSync(path.join(__dirname,"../", "posts"));
//   console.log('xxx',fs.readdirSync(path.join("posts")));
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: true,
  };
}

export const getStaticProps: GetStaticProps = (context) => {
  console.log("xx", context.params);
  return {
    props: {},
  };
};

const Post = () => {
  return <>Hello</>;
};
export default Post;
