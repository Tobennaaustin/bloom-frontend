import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="z-1000 relative py-5">
        <div className="flex z-1000 items-center justify-between sm:pb-4 sm:px-0 px-1.5 pt-5 mx-5">
          <div className="flex items-center justify-between gap-[5px]">
            <div className="bg-transparent flex justify-center items-center w-[50px] ml-5">
              <img
                src="/image.png"
                alt=""
                className="w-full h-full object-cover"></img>
              <p className="md:text-3xl text-[24px] tracking-tight text-[#222] opacity-90 font-medium hedvig pt-1">
                Bloom
              </p>
            </div>
          </div>

          <div className="md:flex hidden items-center gap-7 text-black">
            <Link to="#features" className="cursor-pointer">Features</Link>
            <Link to="#howitworks" className="cursor-pointer">How it works</Link>
          </div>
          <Link to="/login">
            <div className="bg-[#1f514c] hidden gap-2 text-white py-1 pl-5 pr-1 rounded-full  md:flex justify-end items-center">
              <p>Start Selling</p>
              <div className="p-1.5 bg-white rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="#000">
                  <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"></path>
                </svg>
              </div>
            </div>
          </Link>
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 w-8 h-10 justify-center items-end relative z-[100]"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}>
            <div
              className={cn(
                "bg-black w-full h-1 rounded-full transition-all duration-300 origin-center",
                isOpen && "translate-y-[10px] rotate-45",
              )}></div>
            <div
              className={cn(
                "bg-black w-[60%] h-1 rounded-full transition-all duration-300 origin-center",
                isOpen && "w-full -translate-y-[10px] -rotate-45",
              )}></div>
          </button>
          

          <div
            className={cn(
              "w-full h-screen pb-16 md:hidden z-[99] fixed top-0 left-0 bg-linear-to-b from-[#ffff] via-[#ffff] to-[#edffe3] transition-all duration-300",
              isOpen
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none",
            )}>
            <div className="w-full h-full p-5 pt-22 flex flex-col gap-3">
              
              <div className="w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="flex flex-col pt-5 gap-6 mb-auto text-xl">
                <Link
                  to="#features"
                  onClick={closeMenu}
                  className="gap-2 justify-between text-black hover:text-[#1f514c] transition-colors duration-200 flex items-center cursor-pointer">
                  <p>Features</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#999">
                    <path d="M645.77-647.85 272.46-274.92q-8.31 8.3-20.88 8.11-12.58-.19-20.89-8.5-8.3-8.31-8.3-20.69t8.3-20.69L603.62-690H275.77q-12.75 0-21.38-8.63-8.62-8.63-8.62-21.38 0-12.76 8.62-21.37 8.63-8.62 21.38-8.62h393.84q15.37 0 25.76 10.39 10.4 10.4 10.4 25.76V-320q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.38-8.63-8.61-8.62-8.61-21.37v-327.85Z"></path>
                  </svg>
                </Link>

                <Link
                  to="#howitworks"
                  onClick={closeMenu}
                  className="gap-2 justify-between text-black hover:text-[#1f514c] transition-colors duration-200 flex items-center cursor-pointer">
                  <p>How it works</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#999">
                    <path d="M645.77-647.85 272.46-274.92q-8.31 8.3-20.88 8.11-12.58-.19-20.89-8.5-8.3-8.31-8.3-20.69t8.3-20.69L603.62-690H275.77q-12.75 0-21.38-8.63-8.62-8.63-8.62-21.38 0-12.76 8.62-21.37 8.63-8.62 21.38-8.62h393.84q15.37 0 25.76 10.39 10.4 10.4 10.4 25.76V-320q0 12.75-8.63 21.37-8.63 8.63-21.38 8.63-12.76 0-21.38-8.63-8.61-8.62-8.61-21.37v-327.85Z"></path>
                  </svg>
                </Link>
                <div className="flex flex-col gap-3 mt-3 text-lg">
                  <Link to="/login" onClick={closeMenu}>
                    <div className="bg-white border-[#ccc] border gap-2 text-black py-3.5 rounded-xl flex justify-center items-center cursor-pointer">
                      <p>Login</p>
                    </div>
                  </Link>
                  <Link to="/onboarding" onClick={closeMenu}>
                    <div className="bg-[#1f514c] gap-2 text-white py-3.5 rounded-xl flex justify-center items-center cursor-pointer">
                      <p>Create an Account</p>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="sm:max-w-[350px] w-[80%] mx-auto flex flex-col justify-center text-center gap-5">
                <div className="text-gray-600 text-sm">
                  Built for Crawford University vendors.
                </div>
                <div className="flex mx-auto text-xs gap-2 py-[5px] rounded-lg px-[10px] items-center">
                  <p>© 2026 Bloom</p>
                  <div className="w-1.5 h-1.5 bg-[#1f514c] rounded-full"></div>
                  <p>All Rights Reserved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav