import React from 'react'

export interface IAvatar {
  src: string
  width?: number
  height?: number
}

const Avatar = (props: IAvatar) => {
  const { src, width = 70, height = 70 } = props
  return (
    <>
      <img src={src} width={width} height={height} className="avatar" />
    </>
  )
}
export default Avatar
