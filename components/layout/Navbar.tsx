import React, { useState, useEffect, useRef } from "react";
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

const Navbar = () => {
  const [currentWindowOffsetY, setWindowOffsetY] = useState(0);
  const [isHideScrollBar, setIsHideScrollBar] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);
  const [isSearchInputOpen, setIsSeachInputOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const firstTimeLoadNav = useRef(true);
  const context = useFirebaseContext();

  useEffect(() => {
    window.addEventListener("scroll", function (e: any) {
      if (!firstTimeLoadNav.current) {
        let windowScrollY = this.scrollY;
        if (windowScrollY <= currentWindowOffsetY) {
          setIsHideScrollBar(false);
        } else {
          setIsHideScrollBar(true);
        }
        setWindowOffsetY(windowScrollY);
      } else firstTimeLoadNav.current = false;
    });
    return () => {
      window.removeEventListener("scroll", function (e: any) {
        let windowScrollY = this.scrollY;
        if (windowScrollY <= currentWindowOffsetY) {
          setIsHideScrollBar(false);
        } else {
          setIsHideScrollBar(true);
        }
      });
    };
  }, [currentWindowOffsetY]);

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
          top: isHideScrollBar ? "-100px" : "0px",
          boxSizing: "border-box",
        }}
      >
        <div className="row" style={{ borderBottom: "2px solid #404548" }}>
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
          <div className="col-3 logo">
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
          <div className="col-9 contentContainer">
            <div className="nav-item">
              About me
              <ul className="dropDownMenu">
                <li className="dropDownItem">Hello 1</li>
                <li className="dropDownItem">Hello 2</li>
                <li className="dropDownItem">Hello 3</li>
              </ul>
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
          }),
        }}
      >
        <AiOutlineSearch
          className="searchIcon"
          size={21}
          onClick={() => {
            setIsSeachInputOpen((prev) => !prev);
          }}
        />
        <Input
          value={"ddd"}
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </>
  );
};

export default Navbar;
