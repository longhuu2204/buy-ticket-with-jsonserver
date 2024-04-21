import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header>
      <div className="nav flex justify-end gap-x-5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6Z"
              />
            </svg>
            TIN MỚI & ƯU ĐÃI
          </div>
        </NavLink>
        <NavLink
          TO="/"
          className={({ isActive }) => (isActive ? "text-primary" : "")}
        >
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            ĐĂNG NHẬP/ ĐĂNG KÝ
          </div>
        </NavLink>
      </div>
      <a className="logo">
        <img
          src="https://banner2.cleanpng.com/20180615/oli/kisspng-cinema-film-director-television-film-digital-millennium-copyright-act-5b23cf472887a5.197278891529073479166.jpg"
          alt="Logo"
          className="w-5"
        />
      </a>
    </header>
  );
};

export default Header;
