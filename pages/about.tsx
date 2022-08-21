import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import HoverEffect from "hover-effect";

enum Person {
  ME = "ME",
  LOVE = "LOVE",
}

const About = () => {
  const [hoverEffect, setHoverEffect] = useState<any>(null);
  const [currentPerson, setCurrentPerson] = useState<Person>(Person.ME);

  const handleClick = useCallback(() => {
    if (currentPerson === Person.ME) {
      hoverEffect.next();
      setCurrentPerson(Person.LOVE);
    } else {
      hoverEffect.previous();
      setCurrentPerson(Person.ME);
    }
  }, [hoverEffect, currentPerson]);

  useEffect(() => {
    const hover = new HoverEffect({
      parent: document.querySelector("#userAvatar"),
      intensity: 0.5,
      image1: "./self.jpg",
      image2: "./logo.jpg",
      displacementImage: "./distortion.png",
    });
    setHoverEffect(hover);
  }, []);

  return (
    <section className="about w-100">
      <div className="about-tab-container w-100 d-flex">
        <div className="about-content">
          <div
            id="userAvatar"
            className="userAvatar"
            // style={{
            //   backgroundImage: "url('./self.jpg')",
            // }}
          ></div>
          {currentPerson === Person.ME && (
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 h-100 description">
              <div className="name-wrapper">
                <h1 className="description-name">Hoàng Đức Huy</h1>
                <sub>I do backend, frontend React, Vue.</sub>
              </div>
              <div className="description-wrapper">
                <p className="mb-3">
                  Các bạn có thể gọi mình là Huy ^^.Mình từng là sinh viên của
                  PTIT. Mình viết blog này với mục đích lưu trữ lại kiến thức
                  với những công nghệ mình đã tìm hiểu. Vậy nên nếu bạn muốn
                  đóng góp gì hãy liên lạc với mình qua thông tin bên dưới
                </p>
                <q>
                  <i>To infinity and beyond 🚀</i>
                </q>
                <div className="col-12 row align-center social-wrapper mt-4">
                  <Link
                    href="https://www.instagram.com/duchuy_h/?hl=en"
                    passHref
                  >
                    <a target={"_blank"}>
                      <FaLinkedin size={25} />
                    </a>
                  </Link>
                  <Link href="https://www.facebook.com/croong.hoang" passHref>
                    <a target={"_blank"}>
                      <FaFacebookSquare size={25} />
                    </a>
                  </Link>
                  <Link href="https://github.com/duchuyhoang" passHref>
                    <a target={"_blank"}>
                      <FaGithub size={25} />
                    </a>
                  </Link>
                  <Link href="mailto:huyhoang10032000@gmail.com" passHref>
                    <a target={"_blank"}>
                      <AiOutlineMail size={25} />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {currentPerson === Person.LOVE && (
            <div className="col-12 col-md-6 col-lg-6 col-xl-6 h-100 description">
				<div className="name-wrapper">
                <h1 className="description-name">Nguyễn Ngọc Anh</h1>
                <sub>Cô sinh viên NEU ^^</sub>
              </div>
			</div>
          )}
        </div>

        <ul className="d-flex justify-center tab-header-container w-100 mt-5">
          <li
            className={`header-item ${
              currentPerson === Person.ME && "header-item-active"
            } `}
            onClick={handleClick}
          >
            About me 😄
          </li>
          <li
            className={`header-item ${
              currentPerson === Person.LOVE && "header-item-active"
            }`}
            onClick={handleClick}
          >
            About my love ❤️
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
