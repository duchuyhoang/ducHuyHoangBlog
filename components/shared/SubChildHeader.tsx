import React from 'react'
export interface ISubChildHeader {
  children: React.ReactNode
}
const SubChildHeader = ({ children, ...rest }: ISubChildHeader) => {
  return (
    <h3 className="subChildHeader" {...rest}>
      {children}
    </h3>
  )
}
export default SubChildHeader
