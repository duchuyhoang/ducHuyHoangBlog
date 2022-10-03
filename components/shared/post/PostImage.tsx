import React from 'react'

const PostImage = ({ src,...rest }) => {
  return <img className="w-100" src={src} {...rest} />
}
export default PostImage
