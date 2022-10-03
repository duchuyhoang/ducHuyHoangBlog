import React from 'react'
import Avatar from '../Avatar'
import Tag, { ITag } from './Tag'
import moment from 'moment'
import { FaCalendarAlt } from 'react-icons/fa'
interface IPostHeader {
  header: string
  tags: string[]
  avatar: Maybe<string>
  date: string
  minuteRead: string | number
}
const Dot = (props = {}) => (
  <div className="mr-1" {...props}>
    -
  </div>
)

const PostHeader = ({
  header,
  tags = [],
  avatar,
  date,
  minuteRead
}: IPostHeader) => {
  return (
    <div className="post-header mt-4">
      <div className="tag-wrapper mb-3">
        {tags.map((tag, index) => (
          <Tag value={tag} key={`tag_` + index} />
        ))}
      </div>
      <h1 className="w-50 text-center col-8 col-sm-10">{header}</h1>
      <Avatar src={avatar || ''} width={80} height={80} />
      <div className="mt-4 d-flex align-center">
        <FaCalendarAlt className="mr-2" style={{ fill: '#171e22' }} size={17} />
        <Dot />
        <p className="mr-2">{minuteRead} minutes read</p>
        <Dot />
        <p className="mr-2">
          {moment(date).isValid() ? `${moment(date).format('DD-MM-YYYY')}` : ''}
        </p>
        <Dot />
		<a href="#comment">Bình luận</a>
      </div>
    </div>
  )
}

export default PostHeader
