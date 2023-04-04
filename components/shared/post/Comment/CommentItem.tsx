/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import React, { useMemo } from 'react'
import { Comment } from '../../../../services/model/Comment'
import Avatar from '../../Avatar'
import moment from 'moment'
import { Col } from 'react-bootstrap'

interface ICommentItem {
  comment: Comment
}

const CommentItem = ({ comment }: ICommentItem) => {
  const dateString = useMemo(() => {
    const localDate = moment(comment.createAt).local()
    // return `write at ${localDate.format('YYYY-MM-DD, hh:mm A')}`
    return localDate.fromNow()
  }, [comment])
  return (
    <div className="comment-item">
      <Avatar src={comment?.user?.avatar ?? undefined} width={46} height={46} />
      <div className="content">
        <div className="author">
          {/* <Col xs={12} md={6}> */}
          <h5>{comment.user.name || 'Anomyous'}</h5>
          {/* </Col> */}
          {/* <Col xs={12} md={6}> */}
          <p className="date">{dateString}</p>
          {/* </Col> */}
        </div>
        <div className="text">{comment.content}</div>
      </div>
    </div>
  )
}
export default CommentItem
