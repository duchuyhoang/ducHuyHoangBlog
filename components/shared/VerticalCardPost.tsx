import Link from 'next/link'
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { THEME } from '../../common/enum'
import { IPost } from './FeaturePost'
import { useTheme } from './Theme'
import { BiCalendar } from 'react-icons/bi'
import ShowMoreText from './ShowMore'
import Avatar from './Avatar'
import { FaTags } from 'react-icons/fa'
const VerticalCardPost = ({
  author,
  date,
  title,
  slug,
  description,
  image
}: IPost) => {
  const { theme } = useTheme()
  return (
    <div className="vertical-card">
      <Link href={'/'} passHref>
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
            <img src={image} alt="" />
          </div>
        </a>
      </Link>

      <div className="vertical-card-content">
        <Row className="mt-3">
          <div
            className="tag-container d-flex align-items-center"
            style={{ fontSize: '14px' }}
          >
            <FaTags
              className="mr-2"
              size={'16px'}
              style={{
                fill: 'var(--color-text)'
              }}
            />
            <Link href="/">
              <a className="mr-1">#Hello</a>
            </Link>
            <Link href="/">
              <a className="mr-1">#Hello 2</a>
            </Link>
          </div>
        </Row>
        <Row className="m-0 mt-2">
          <Col xs="7" className="pl-0 pr-0 d-flex">
            <Avatar
              src="/ducHuyHoangBlog/selfAvatar.jpg"
              width={30}
              height={30}
              className="avatar mr-1"
            />
            <div className="ml-1">
              <Link href="/" passHref>
                <a
                  href=""
                  className="vertical-card-author p-0"
                  style={{
                    marginBlockStart: '4px',
                    fontSize: '16px'
                  }}
                >
                  Đức Huy Hoàng
                </a>
              </Link>
            </div>
          </Col>
          <Col xs="5" className="pr-0">
            <p
              className="vertical-card-date d-flex align-items-center justify-content-end"
              style={{ textAlign: 'right' }}
            >
              <BiCalendar
                style={{
                  marginBottom: '2px',
                  marginRight: '5px'
                }}
              />
              May 5, 2022
            </p>
          </Col>
        </Row>
        <Link href="/" passHref>
          <a href="" className="vertical-card-title">
            {title}
            {/* Learn Python with Pj! Part 4 - Dictionaries and Files */}
          </a>
        </Link>

        <div className="vertical-card-bar"></div>
        <p className="vertical-card-description">
          <ShowMoreText
            lines={4}
            expandByClick={false}
            more={
              <Link href="/" passHref>
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
