import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FaFacebookSquare, FaGithub } from 'react-icons/fa'
import Input from '../shared/Input'

export interface ILeftSideBar {
  tags: string[]
}

const LeftSideBar = ({ tags }: ILeftSideBar) => {
  const [searchValue, setSearchValue] = useState<string>('')
  return (
    <section className="left-side-bar">
      <div style={{ flexGrow: 1 }}>
        <h3 className="left-side-bar-title mb-5">Blog</h3>
        <div>
          <h4 className="left-side-bar-subTitle">Search the blog</h4>
          <Input
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value)
            }}
            placeholder="Search"
            inputProps={{
              className: 'mt-4 left-side-bar-search'
            }}
          />
        </div>

        <div>
          <h4 className="mt-4 left-side-bar-subTitle">Follow me</h4>
          <div className="mt-4 left-side-bar-social-container">
            <div className="social-item">
              <Link href="https://www.facebook.com/croong.hoang" passHref>
                <a target={'_blank'}>
                  <FaFacebookSquare size={30} />
                </a>
              </Link>
            </div>
            <div className="social-item">
              <Link href="https://github.com/duchuyhoang" passHref>
                <a target={'_blank'}>
                  <FaGithub size={30} />
                </a>
              </Link>
            </div>
            <div className="social-item">
              <Link href="https://www.instagram.com/duchuy_h/?hl=en" passHref>
                <a target={'_blank'}>
                  <AiFillInstagram size={30} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h4 className="mt-4 left-side-bar-subTitle">Categories</h4>
        <ul className="left-side-bar-tag-container">
          {tags.map((tag, key) => (
            <li className="tag-item" key={`tag_${key}`}>
              <Link href={`/category/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default LeftSideBar
