import React from 'react'
interface ILayout {
  children: React.ReactNode
}
const Layout = ({ children }: ILayout) => {
  return (
    <section className="d-flex justify-center align-center layout">
      <div className="col-10 col-sm-11 col-md-10 col-xl-7">{children}</div>
    </section>
  )
}

export default Layout
