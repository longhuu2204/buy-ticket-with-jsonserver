import React from "react";
import { NavLink, Navigate } from "react-router-dom";
const Header = () => {
  const navigate = Navigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userInfoFromStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoFromStorage);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  return (
    <header className="overflow-hidden">
      <div className="nav flex justify-end gap-x-5 page-container mx-auto py-2">
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
        {isLoggedIn ? (
          <>
            <div className="flex items-center">
              <button onClick={() => navigate} className="text-primary">
                Đăng xuất
              </button>
              <div className="mr-2">Chào mừng, {userInfo.name}</div>
              <button onClick={handleLogout} className="text-primary">
                Đăng xuất
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Nếu chưa đăng nhập, hiển thị nút đăng nhập */}
            <NavLink
              to="/login"
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
          </>
        )}
      </div>
      <div className="logo-and-nav bg-header-bg-img w-[100vw] mb-5">
        <div className="flex items-center h-[120px] page-container mx-auto">
          <a className="logo" href="/">
            <img
              src="https://seeklogo.com/images/M/movie-time-cinema-logo-8B5BE91828-seeklogo.com.png"
              alt="Logo"
              className="h-[100px] mr-10"
            />
          </a>
          <div className="flex translate-y-4 gap-x-5 font-bold">
            <NavLink to="/movies" className="hover:text-primary">
              PHIM
            </NavLink>
            <NavLink to="/" className="hover:text-primary">
              RẠP
            </NavLink>
            <NavLink to="/" className="hover:text-primary">
              QUYỀN LỢI THÀNH VIÊN
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
