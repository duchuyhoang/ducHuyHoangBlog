import React from 'react'
import Avatar from '../Avatar'
import Tag from './Tag'
import moment from 'moment'
import { FaCalendarAlt } from 'react-icons/fa'
import { IAuthor } from '../../def/author'
import Link from 'next/link'
export interface IPostHeader {
  title: string
  tags: string[]
  date: string
  minuteRead: string | number
  author: IAuthor
}
const Dot = (props = {}) => (
  <div className="ml-1 mr-1 dot" {...props}>
    -
  </div>
)

const PostHeader = ({
  title,
  tags = [],
  date,
  minuteRead,
  author
}: IPostHeader) => {
  return (
    <div className="post-header pt-4">
      <div className="tag-wrapper mb-3">
        {tags.map((tag, index) => (
          <Tag value={tag} key={`tag_${index}`} />
        ))}
      </div>
      <h1 className="text-center col-12 post-header-title">{title}</h1>
      <div className="mt-4 d-flex align-center">
        <div className="d-flex align-center">
          <FaCalendarAlt
            className="mr-1 mb-1"
            style={{ fill: '#171e22' }}
            size={17}
          />

          <p>
            {moment(date).isValid()
              ? `${moment(date).format('DD-MM-YYYY')}`
              : ''}
          </p>
        </div>
        <Dot />
        <p>{minuteRead} minutes read</p>
        <Dot />
        <Link href="#comment" passHref>
          <a href="" style={{ marginTop: '1px' }}>
            Bình luận
          </a>
        </Link>
      </div>
      <div className="mt-4">
        <Avatar src={author?.avatar || ''} width={90} height={90} />
      </div>
      <div className="mt-4 d-flex align-center justify-center author">
        {author?.name || 'Anomyous'}
      </div>
    </div>
  )
}

export default PostHeader
