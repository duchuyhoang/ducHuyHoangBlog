import React from 'react'
import LoadingImage from '../../public/logo.svg'

interface ILoading {
  containerProps?: React.HTMLProps<HTMLDivElement>
  iconProps?: React.SVGProps<SVGElement>
}

const Loading = ({ containerProps, iconProps }: ILoading) => {
  return (
    <div className="loading" {...containerProps}>
      <LoadingImage width={70} height={70} {...iconProps} />
    </div>
  )
}

export default Loading
