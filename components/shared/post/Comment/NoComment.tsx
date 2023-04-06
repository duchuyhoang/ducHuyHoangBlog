import React from 'react'
import { GoCommentDiscussion } from 'react-icons/go'
const NoComment = () => {
  return (
    <div className="d-flex align-items-center justify-centeu">
      <GoCommentDiscussion
        size={47}
        style={{
          fill: '#E5E5E5'
        }}
      />
      <div
        className="ml-3"
        style={{
          color: 'var(--color-text)',
          maxWidth: '140px',
          marginBottom: '5px',
          fontSize: '15px'
        }}
      >
        Be the first comment in post
      </div>
    </div>
  )
}

export default NoComment
