import React from "react";
import NavLinks from "./NavLinks";
import Image from "next/image";
import Link from "next/link";
import Marquee from "./Marquee";
import AuthLinks from "./AuthLinks";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="bg-[#FAFCFA] border-b border-base-300">
      <div className="navbar border-b border-base-300">
        <div className="w-7xl mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  aria-label="Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <NavLinks />
              </ul>
            </div>
            <Link href={"/"}>
              <div className="flex items-center gap-2">
                <Image
                  src={"/logo.png"}
                  alt="logo image"
                  height={60}
                  width={60}
                  className="rounded-lg"
                />
                <div className="md:flex flex-col hidden">
                  <span className="font-bold text-xl leading-7">বাজার দর</span>
                  <span>{date}</span>
                </div>
              </div>
            </Link>
          </div>
          <div className="navbar-end gap-5">
            <AuthLinks/>
          </div>
        </div>
      </div>
      {/* Nav Link start */}
      <div className="border-b border-base-300">
        <div className="w-7xl mx-auto hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 text-sm font-semibold">
            <NavLinks />
          </ul>
        </div>
      </div>
      {/* Nav Link end */}
      <Marquee />
    </div>
  );
};

export default Header;
