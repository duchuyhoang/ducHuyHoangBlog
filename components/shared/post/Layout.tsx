import React from 'react'

const Layout = ({ children }) => {
  return (
    <section className="d-flex justify-center align-center layout">
      <div className="col-10 col-sm-11 col-md-10 col-xl-7">{children}</div>
    </section>
  )
}

export default Layout
