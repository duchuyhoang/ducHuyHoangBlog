import React from 'react'
export interface IPostImage {
  src: string
}
const PostImage = ({ src, ...rest }: IPostImage) => {
  return (
    <div
      className="w-100"
      style={{ maxHeight: '500px', borderRadius: '5px', overflow: 'hidden' }}
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
