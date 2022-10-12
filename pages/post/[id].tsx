import React, { useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import remarkMdxCodeMeta from 'remark-mdx-code-meta'
import matter from 'gray-matter'
import { makeid } from '../../common/utils'
import { POST_FOLDER_NAME } from '../../common/constants'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Message from '../../Message'
import Avatar from '../../components/shared/Avatar'
import Paragraph from '../../components/shared/post/Paragraph'
import Layout from '../../components/shared/post/Layout'
import PostHeader from '../../components/shared/post/PostHeader'
import PostImage from '../../components/shared/post/PostImage'
import SubHeader from '../../components/shared/post/SubHeader'
import CodeBlock from '../../components/shared/post/CodeBlock'
import Tags from '../../components/shared/post/Tags'
import Line from '../../components/shared/post/Line'
import PostLink from '../../components/shared/post/PostLink'
import Quote from '../../components/shared/post/Quote'
import Comment from '../../components/shared/post/Comment'

export type IPost = {
  fileMetadata: { [key: string]: any }
  content: any
  compliedSource: any
}

export async function getStaticPaths() {
  const fileNameList = fs.readdirSync(path.join('posts'))

  const idList = fileNameList.map(fileName => {
    const fileContent = fs.readFileSync(path.join(POST_FOLDER_NAME, fileName))
    return {
      params: {
        id: matter(fileContent?.toString() || '').data.slug || makeid(10)
      }
    }
  })
  return {
    paths: idList,
    fallback: false
  }
}
// : GetStaticProps<IPost, { id: string }>
export async function getStaticProps(context: any) {
  let id = ''
  if (context.params) {
    id = context.params.id
  }

  const fileNameList = fs.readdirSync(path.join('posts'))
  let content = '',
    fileMetadata = {},
    compliedSource = ''

  for (let i = 0; i < fileNameList.length; i++) {
    const fileContent = matter(
      fs.readFileSync(path.join(POST_FOLDER_NAME, fileNameList[i]).toString())
    )
    if (fileContent?.data?.slug === id) {
      ;(content = fileContent.content), (fileMetadata = fileContent.data)
      break
    }
  }
  return {
    props: {
      content: await serialize(content, {
        mdxOptions: {
          remarkPlugins: [remarkMdxCodeMeta]
        }
      }),
      fileMetadata,
      compliedSource
    }
  }
}

export const components = {
  Message,
  Avatar,
  p: Paragraph,
  Layout,
  PostHeader,
  PostImage,
  img: PostImage,
  h2: SubHeader,
  a: PostLink,
  pre: CodeBlock,
  CodeBlock: CodeBlock,
  Quote: Quote,
  Tags: Tags,
  hr: Line,
  Comment: Comment
}
const Post = (props: IPost) => {
  const { content, fileMetadata } = props
  useEffect(()=>{
	if(fileMetadata?.title){
		document.title= fileMetadata.title;
	}
  },[fileMetadata])
  return <MDXRemote {...content} components={components} />
}

export default Post
