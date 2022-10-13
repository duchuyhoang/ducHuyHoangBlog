import React from 'react'

const PostImage = ({ src, ...rest }) => {
  return (
    <div
      className="w-100"
      style={{ height: '250px', borderRadius: '5px', overflow: 'hidden' }}
    >
      <img
        className="w-100"
        style={{ objectFit: 'cover', borderRadius: '5px', overflow: 'hidden' }}
        src={src}
        {...rest}
      />
    </div>
  )
}
export default PostImage
