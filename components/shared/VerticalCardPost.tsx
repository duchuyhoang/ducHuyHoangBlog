import Link from "next/link";
import React from "react";
import { IPost } from "./FeaturePost";

const VerticalCardPost = ({
  author,
  date,
  title,
  slug,
  description,
  image,
}: IPost) => {
  return (
    <div className="vertical-card">
      <div className="vertical-card-img">
        <img
          src={image}
          alt=""
          //   width={"100%"}
          //   height={"100%"}
          //   layout="fill"
        />
      </div>

      <div className="vertical-card-content">
        <Link href="/" passHref>
          <a href="" className="vertical-card-title">
            {title}
            {/* Learn Python with Pj! Part 4 - Dictionaries and Files */}
          </a>
        </Link>
        <Link href="/" passHref>
          <a href="" className="vertical-card-author">
            Pj Metz
          </a>
        </Link>
        <p className="vertical-card-date">May 5, 2022</p>
        <div className="vertical-card-bar"></div>
        <p className="vertical-card-description">{description}</p>
      </div>
    </div>
  );
};

export default VerticalCardPost;
