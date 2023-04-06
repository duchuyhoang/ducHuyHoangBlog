import React from 'react'
export interface IFullSizeImage {
  src: string
}
const FullSizeImage = ({ src, ...rest }: IFullSizeImage) => {
  return (
    <div className="w-100" style={{ borderRadius: '5px', overflow: 'hidden' }}>
      <img
        className="w-100"
        style={{ objectFit: 'cover', borderRadius: '5px', overflow: 'hidden' }}
        src={src}
        {...rest}
      />
    </div>
  )
}
export default FullSizeImage
