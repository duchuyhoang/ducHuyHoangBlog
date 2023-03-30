import Link from 'next/link'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { THEME } from '../../common/enum'
import { IPost } from './FeaturePost'
import { useTheme } from './Theme'
import ShowMoreText from './ShowMore'
import Avatar from './Avatar'
import { FaTags } from 'react-icons/fa'
import { getDateStringText, getImageSrc } from '../../common/utils'

const VerticalCardPost = ({
  author,
  date,
  title,
  slug,
  description,
  image,
  tags,
  minuteRead
}: IPost) => {
  const { theme } = useTheme()
  return (
    <div className="vertical-card">
      <Link href={`/post/${slug}`} passHref>
        <a>
          <div
            className="vertical-card-img"
            style={{
              boxShadow:
                theme === THEME.LIGHT
                  ? '1px 1px 6px rgba(216, 216, 216, 0.5)'
                  : '0px 10px 10px rgba(44, 44, 46, 0.25)',
              backgroundColor: theme === THEME.LIGHT ? '#fff' : '#2c2c2e'
            }}
          >
            <img src={getImageSrc(image!)} alt="" />
          </div>
        </a>
      </Link>

      <div className="vertical-card-content">
        <Row className="mt-3">
          <FaTags
            className="flex-wrap"
            size={'16px'}
            style={{
              fill: 'var(--color-text)',
              marginBottom: '2px',
              width: 'max-content'
            }}
          />
          <div
            className="tag-container d-flex align-items-center"
            style={{ fontSize: '14px' }}
          >
            {tags.map(tag => (
              <Link href={`/tags?tags[]=${tag}`} key={tag}>
                <a className="mr-1">#{tag}</a>
              </Link>
            ))}
          </div>
        </Row>
        <Row className="m-0 mt-2">
          <Col xs="12" className="pl-0 pr-0 d-flex">
            <Avatar
              src={author?.avatar}
              width={40}
              height={40}
              className="avatar mr-1"
            />
            <div className="ml-2">
              <Link href="/" passHref>
                <a
                  href=""
                  className="vertical-card-author p-0"
                  style={{
                    marginBlockStart: '3px',
                    fontSize: '16px'
                  }}
                >
                  {author.name}
                </a>
              </Link>
              <p className="vertical-card-date d-flex align-items-center">
                {getDateStringText(date)} - {minuteRead} min read
              </p>
            </div>
          </Col>
        </Row>
        <Link href="/" passHref>
          <a href="" className="vertical-card-title">
            {title}
          </a>
        </Link>

        <div className="vertical-card-bar"></div>
        <p className="vertical-card-description">
          <ShowMoreText
            lines={4}
            expandByClick={false}
            more={
              <Link href={`/post/${slug}`} passHref>
                <a>Show more</a>
              </Link>
            }
          >
            {description}
          </ShowMoreText>
        </p>
      </div>
    </div>
  )
}

export default VerticalCardPost
