import Image from 'next/image'
import React from 'react'

const NothingFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <Image src={'/nothing-found.png'} width={330} height={330} />
      <h2 className="mt-3">Nothing found</h2>
    </div>
  )
}
export default NothingFound
