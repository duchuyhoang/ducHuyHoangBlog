import Link from 'next/link'
import React from 'react'
import moment from 'moment'
import { IPost } from './FeaturePost'
import { NextRouter, useRouter } from 'next/router'
import ShowMoreText from './ShowMore'
import { THEME } from '../../common/enum'
import { useTheme } from './Theme'
import { BiCalendar } from 'react-icons/bi'
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
  const { theme } = useTheme()

  const handleRedirect = async () => {
    await router.push(`/post/${slug}`)
  }

  return (
    <div
      className="horizontal-card flex-sm-nowrap"
      onClick={handleRedirect}
      style={{
        boxShadow:
          theme === THEME.LIGHT
            ? '1px 1px 6px rgba(216, 216, 216, 0.5)'
            : 'none'
        // backgroundColor:theme === THEME.LIGHT ? "none" : ""
      }}
    >
      <div className="image col-12 col-sm-3">
        <img src={image} alt="" className="horizontal-card-img" />
      </div>
      <div className="p-2 p-sm-3">
        <div className="horizontal-card-content-container ml-2 mr-2">
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
              <span className="mr-1 mb-1">
                <BiCalendar />
              </span>
              <p className="date mb-0">{moment(date).format('YYYY-MM-DD')}</p>
            </div>
          </div>
          <div className="description">
            {description}
            {/* <ShowMoreText lines={4}>{description}</ShowMoreText> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HorizontalCardPost
