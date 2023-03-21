import React from 'react'

export interface IAvatar extends React.ImgHTMLAttributes<'img'> {
  src: string
  width?: number
  height?: number
  style?: React.CSSProperties
}

const Avatar = (props: IAvatar) => {
  const { src, width = 70, height = 70 } = props
  return (
    <>
      <img
        src={src}
        width={width}
        height={height}
        className="avatar"
        {...(props as any)}
      />
    </>
  )
}
export default Avatar
