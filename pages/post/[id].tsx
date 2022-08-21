import React from "react";
import fs from "fs";
import path from "path";
import { GetStaticProps, NextPageContext } from "next";
import matter from "gray-matter";
import { makeid } from "../../common/utils";
import { POST_FOLDER_NAME } from "../../common/constants";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Message from "../../Message";
import Avatar from "../../components/shared/Avatar";
export type IPost = {
  fileMetadata: { [key: string]: any };
  content: any;
};

export async function getStaticPaths() {
  //   console.log(path.join("posts"));
  const fileNameList = fs.readdirSync(path.join("posts"));
  //   console.log(fileList);
  const idList = fileNameList.map((fileName) => {
    // console.log(matter(file));
    const fileContent = fs.readFileSync(path.join(POST_FOLDER_NAME, fileName));
    return {
      params: {
        id: matter(fileContent?.toString() || "").data.slug || makeid(10),
      },
    };
  });
  return {
    paths: idList,
    fallback: false,
  };
}
// : GetStaticProps<IPost, { id: string }>
export async function getStaticProps(context: any) {
  let id = "";
  if (context.params) {
    id = context.params.id;
  }

  const fileNameList = fs.readdirSync(path.join("posts"));
  let content = "",
    fileMetadata = {};

  for (let i = 0; i < fileNameList.length; i++) {
    const fileContent = matter(
      fs.readFileSync(path.join(POST_FOLDER_NAME, fileNameList[i]).toString())
    );
    if (fileContent?.data?.slug === id) {
      content = fileContent.content;
      fileMetadata = fileContent.data;
      break;
    }
  }
  return {
    props: {
      content: await serialize(content),
      fileMetadata,
    },
  };
}
const components = {
  Message,
  Avatar
};
const Post = (props: IPost) => {
  const { content, fileMetadata } = props;
  //   console.log(props);
    return <MDXRemote {...content} components={components} />;
};
export default Post;
