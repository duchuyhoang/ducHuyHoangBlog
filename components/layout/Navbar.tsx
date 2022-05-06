import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../shared/Modal";
import { FaGithub, FaFacebookSquare } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  Auth,
} from "firebase/auth";
import { getFirebase } from "../../services/firebase";
import { useFirebaseContext } from "../../pages";
import Input from "../shared/Input";
import { AiOutlineSearch } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";

const Navbar = () => {
  const [currentWindowOffsetY, setWindowOffsetY] = useState(0);
  // const [isHideScrollBar, setIsHideScrollBar] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSearchInputOpen, setIsSeachInputOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [searchKeyWord, setSearchKeyWord] = useState<string>();
  const context = useFirebaseContext();
  const [navbarHeight, setNavbarHeight] = useState<number>(0);

  useEffect(() => {
    setNavbarHeight(navRef.current?.offsetHeight || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navRef.current]);

  // useEffect(() => {
  //   window.addEventListener("scroll", function (e: any) {
  //     if (!firstTimeLoadNav.current) {
  //       let windowScrollY = this.scrollY;
  //       if (windowScrollY <= currentWindowOffsetY) {
  //         setIsHideScrollBar(false);
  //       } else {
  //         setIsHideScrollBar(true);
  //       }
  //       setWindowOffsetY(windowScrollY);
  //     } else firstTimeLoadNav.current = false;
  //   });
  //   return () => {
  //     window.removeEventListener("scroll", function (e: any) {
  //       let windowScrollY = this.scrollY;
  //       if (windowScrollY <= currentWindowOffsetY) {
  //         setIsHideScrollBar(false);
  //       } else {
  //         setIsHideScrollBar(true);
  //       }
  //     });
  //   };
  // }, [currentWindowOffsetY]);

  const signUp = () => {
    // console.log(context);
    const services = getFirebase();
    // console.log("hello", services);

    if (services?.auth)
      createUserWithEmailAndPassword(
        services?.auth,
        "huyhoang10032000@gmail.com",
        "10032000"
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
          // ...
        })
        .catch((error) => {
          console.log(error, error.code);
          console.log(error.message);

          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="nav nav-dark w-100"
        style={{
          // top: isHideScrollBar
          //   ? (navRef.current?.offsetHeight || 0) * -1
          //   : "0px",
          boxSizing: "border-box",
        }}
      >
        <div className="row">
          <div
            className="accountContainer col-12 d-flex"
            style={{ justifyContent: "flex-end" }}
          >
            <div className="item">
              <p
                onClick={() => {
                  setIsLoginModalOpen(true);
                }}
              >
                Login
              </p>
              <span className="divide"> / </span>
              <p
                onClick={() => {
                  setIsSignUpModalOpen(true);
                }}
              >
                Sign up
              </p>
              <span style={{ padding: 5 }}>
                <AiOutlineSearch
                  size={21}
                  onClick={() => {
                    setIsSeachInputOpen((prev) => !prev);
                  }}
                />
              </span>
            </div>
          </div>
        </div>
        <section className="row">
          <div className="col-2 logo">
            <Link href="/" passHref>
              <Image
                src="/logo.png"
                alt="logo"
                //   layout="fill"
                width={150}
                height={80}
              />
            </Link>
          </div>
          <div className="col-10 contentContainer">
            <div className="nav-item">
              About me
              <ul className="dropDownMenu">
                <li className="dropDownItem">Hello 1</li>
                <li className="dropDownItem">Hello 2</li>
                <li className="dropDownItem">Hello 3</li>
              </ul>
            </div>
            <div className="nav-item">
              Platform
            </div>
            <div className="nav-item">
              Solutions
            </div>
            <div className="nav-item">
              Contact
            </div>
          </div>
        </section>

        <Modal
          title={"Log in"}
          isOpen={isLoginModalOpen}
          handleClose={() => {
            setIsLoginModalOpen(false);
          }}
        >
          <>Hello</>
        </Modal>

        <Modal
          title={"Sign up"}
          isOpen={isSignUpModalOpen}
          handleClose={() => {
            setIsSignUpModalOpen(false);
          }}
        >
          <>
            <Input
              value={"ddd"}
              onChange={(e) => {
                console.log(e);
              }}
            />
            <button onClick={signUp}>Sign up</button>
          </>
        </Modal>
      </nav>
      <div
        className="searchContainer"
        style={{
          ...(isSearchInputOpen && {
            top: navRef.current?.offsetHeight || 0 + 4,
            visibility: "visible",
          }),
        }}
      >
        <AiOutlineSearch
          className="searchIcon"
          size={18}
          onClick={() => {
            setIsSeachInputOpen((prev) => !prev);
          }}
        />
        <Input
          value={searchKeyWord}
          onChange={(e) => {
            console.log(e);
            setSearchKeyWord(e.target.value);
          }}
        />
        <GrFormClose
          className="closeIcon"
          size={18}
          onClick={() => {
            setIsSeachInputOpen(false);
            setSearchKeyWord("");
          }}
        />
      </div>
      <div
        style={{
          paddingBottom: navbarHeight + 5,
          // display: isHideScrollBar ? "none" : "block",
        }}
      ></div>
    </>
  );
};

export default Navbar;
