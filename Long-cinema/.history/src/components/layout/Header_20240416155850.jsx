import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header flex justify-end gap-x-5">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        <ion-icon name="pricetags-outline"></ion-icon>TIN MỚI & ƯU ĐÃI
      </NavLink>
      <NavLink
        TO="/"
        className={({ isActive }) => (isActive ? "text-primary" : "")}
      >
        ĐĂNG NHẬP/ ĐĂNG KÝ
      </NavLink>
    </header>
  );
};

export default Header;
