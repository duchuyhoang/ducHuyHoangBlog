/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { PAGE_PREFIX } from '../../common/constants'
export interface IAvatar extends React.ImgHTMLAttributes<'img'> {
  src: string
  width?: number
  height?: number
  style?: React.CSSProperties
}

async function isImageValid(src) {
  const promise = new Promise(resolve => {
    const img = document.createElement('img')
    img.onerror = () => resolve(false)
    img.onload = () => resolve(true)
    img.src = src
  })

  return await promise
}

const Avatar = (props: IAvatar) => {
  const { src, width = 70, height = 70, ...rest } = props
  const imgEl = useRef<Maybe<HTMLImageElement>>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    isImageValid(src).then(isValid => {
      if (!isValid) {
        imgEl.current!.src = `${PAGE_PREFIX}/anomyous.png`
      }
    })
  }, [src])

  return (
    <div>
      <img
        {...(rest as any)}
        src={src}
        alt="avatar"
        width={width}
        height={height}
        ref={imgEl}
        className="avatar"
      />
    </div>
  )
}
export default Avatar
