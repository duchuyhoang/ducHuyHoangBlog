import Link from 'next/link'
import React from 'react'
import { getImageSrc, getPostSrc } from '../../common/utils'
import { IAuthor } from '../def/author'
import ShowMoreText from './ShowMore'

export interface IPost {
  author: IAuthor
  date: Maybe<Date>
  title: string
  slug: string
  description: string
  isFeature: boolean
  image?: string
  tags: string[]
}

const FeaturePostList = ({ posts }: { posts: IPost[] }) => {
  return (
    <section
      className="feature-post-wrapper"
      style={{
        display: posts.length === 1 ? 'flex!important' : 'grid',
        gridTemplateColumns:
          posts.length === 2 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'
      }}
    >
      {posts.map((post, index) => (
        <FeaturePost
          post={post}
          key={post.slug}
          style={{
            height:
              index === 0 ? 'auto' : posts.length === 2 ? 'auto' : '287px',
            gridColumn:
              index === 0 ? 'span 2' : posts.length === 2 ? 'span 2' : 'unset',
            gridRow:
              index === 0 ? 'span 2' : posts.length === 2 ? 'span 2' : 'unset'
          }}
          className={posts.length === 3 ? 'child' : ''}
        />
      ))}
    </section>
  )
}

const FeaturePost = ({
  post,
  style,
  className
}: {
  post: IPost
  style?: React.CSSProperties
  className: string
}) => {
  console.log(getPostSrc(post.slug))
  return (
    <div
      className={`feature-post ${className}`}
      style={{
        backgroundImage: post.image
          ? `url(${getImageSrc(post.image)})`
          : 'none',
        ...style
        // 'url("https://about.gitlab.com/images/blogimages/red-team-process/pexels-andrey-grushnikov-707676_crop.jpeg")'
      }}
    >
      <div style={{ zIndex: 10, position: 'relative' }}>
        <div className="feature-post-tag">Feature Post</div>
        <div className="feature-post-info">
          <a>{post.author.name}</a>
          <span>-</span>
          <p>Apr 27, 2022</p>
        </div>
        <div className="feature-post-title-container">
          <Link href={getPostSrc(post.slug)} passHref>
            <a className="title">{post.title}</a>
          </Link>
        </div>
        <div className="horizontalBar"></div>
        <p className="feature-post-content">
          <ShowMoreText
            lines={4}
            more={
              <Link href={getPostSrc(post.slug)} passHref>
                <a>Read on</a>
              </Link>
            }
            expandByClick={false}
          >
            {post.description}
          </ShowMoreText>
        </p>
      </div>
    </div>
  )
}

export default FeaturePostList
