import Link from 'next/link'
import React from 'react'
import moment from 'moment'
import { IPost } from './FeaturePost'
import { NextRouter, useRouter } from 'next/router'
const HorizontalCardPost = ({
  author,
  date,
  title,
  slug,
  description,
  image,
  tags
}: IPost) => {
  const router: NextRouter = useRouter()

  const handleRedirect = () => {
    router.push(`/post/${slug}`)
  }

  return (
    <div className="horizontal-card" onClick={handleRedirect}>
      <div className="col-5 col-md-3 image">
        <img src={image} alt="" className="horizontal-card-img" />
      </div>
      <div className="col-7 col-md-9">
        <div className="horizontal-card-content-container ml-2">
          <Link href={`/post/${slug}`} passHref>
            <a className="title">{title}</a>
          </Link>
          <div className="d-flex w-100 mb-1" style={{ flexWrap: 'wrap' }}>
            <div className="col-lg-10 col-md-10 col-sm-12 col-12 info mt-1 mb-2">
              <p>{author?.name}</p>
              <span className="ml-1 mr-1">on</span>
              {tags?.map((tag, index) => (
                <>
                  <Link href={`/tag?tag=${tag}`} passHref key={`tag_${index}`}>
                    <a>{tag}</a>
                  </Link>
                  {index !== tags.length - 1 && <span>,</span>}
                </>
              ))}
            </div>
            <div className="col-lg-2 col-md-2 col-sm-12 col-12 d-flex align-center">
              <span className="mr-1">•</span>
              <p className="date">{moment(date).format('YYYY-MM-DD')}</p>
            </div>
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalCardPost
