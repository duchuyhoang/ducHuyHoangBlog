import Link from "next/link";
import React from "react";
import { IAuthor } from "../def/author";
export interface IPost {
  author: IAuthor;
  date: Maybe<Date>;
  title: string;
  slug: string;
  description: string;
  image?: string;
  tags: string[];
}

const FeaturePost = () => {
  return (
    <div
      className="feature-post"
      style={{
        backgroundImage:
          "url('https://about.gitlab.com/images/blogimages/red-team-process/pexels-andrey-grushnikov-707676_crop.jpeg')",
      }}
    >
      <div style={{ zIndex: 10, position: "relative" }}>
        <div className="feature-post-tag">Feature Post</div>
        <div className="feature-post-info">
          <a>Huy</a>
          <span>-</span>
          <p>Apr 27, 2022</p>
        </div>
        <div className="feature-post-title-container">
          <Link href="/hello" passHref>
            <a className="title">
              DevOps is at the center of GitLab
              <div className="horizontalBar"></div>
            </a>
          </Link>
        </div>
        <p className="feature-post-content">
          GitLab allows companies to do away with the many point solutions that
          have been digitally duct taped together and instead bring all DevOps
          functionalities together in ONE place
          <Link href="/hello" passHref>
            <a>Read on</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FeaturePost;
