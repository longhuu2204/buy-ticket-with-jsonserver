import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    axios
      .get(
        `http://localhost:3000/account?email=${username}&password=${password}`
      )
      .then((response) => {
        const userData = response.data[0];
        if (userData) {
          localStorage.setItem("isLoggedIn", "true");
          setIsLoggedIn(true);
        } else {
          alert("Tên người dùng hoặc mật khẩu không đúng!");
        }
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi kiểm tra đăng nhập:", error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Xin chào, {username}!</p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Đăng nhập</button>
        </div>
      )}
    </div>
  );
};

export default Login;
