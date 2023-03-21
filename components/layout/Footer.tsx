import Link from 'next/link'
import React from 'react'
import { AiFillInstagram, AiOutlineMail } from 'react-icons/ai'
import { FaFacebookSquare, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="footer-wrapper">
          <div className="row justify-center mt-3" style={{ flexWrap: 'wrap' }}>
            <div className="col-12 col-sm-6 d-flex footer-info justify-center mb-2">
              <h2 className="title">Duc Huy Hoang</h2>
              <p>To infinity and beyond 🚀</p>
              {/* <Image
              src="/logo.png"
              alt="logo"
              //   layout="fill"
              width={150}
              height={100}
            /> */}
            </div>
            <div className="col-12 col-sm-6 row justify-center align-center">
              <Link href="https://www.instagram.com/duchuy_h/?hl=en" passHref>
                <a target={'_blank'}>
                  <AiFillInstagram size={25} />
                </a>
              </Link>
              <Link href="https://www.facebook.com/croong.hoang" passHref>
                <a target={'_blank'}>
                  <FaFacebookSquare size={25} />
                </a>
              </Link>
              <Link href="https://github.com/duchuyhoang" passHref>
                <a target={'_blank'}>
                  <FaGithub size={25} />
                </a>
              </Link>
              <Link href="mailto:huyhoang10032000@gmail.com" passHref>
                <a target={'_blank'}>
                  <AiOutlineMail size={25} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="made-by">Made with love by Huy ❤️</section>
    </>
  )
}

export default Footer
