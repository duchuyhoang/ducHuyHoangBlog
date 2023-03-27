import Image from 'next/image'
import React from 'react'

interface INothingFound {
  text?: string
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

const NothingFound = ({ text, containerProps }: INothingFound) => {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      {...containerProps}
    >
      <Image
        src={'/nothing-found.png'}
        width={330}
        height={330}
        alt="Nothing found"
      />
      <h2 className="mt-3">{text ?? 'Nothing found'}</h2>
    </div>
  )
}
export default NothingFound
