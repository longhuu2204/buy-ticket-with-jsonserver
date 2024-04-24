import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().required("Bắt buộc!"),
  password: Yup.string().required("Bắt buộc!"),
});

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const HandleLogin = () => {
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
          alert("Email hoặc mật khẩu không đúng!");
        }
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi kiểm tra đăng nhập:", error);
      });
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={(value) => {
          HandleLogin1(value);
        }}
      >
        <Form>
          <section className="text-gray-600 body-font">
            <div
              className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center"
              style={{
                background:
                  'url("https://cdn.pixabay.com/photo/2017/08/19/19/43/nature-2659682_1280.jpg")',
              }}
            >
              <div className="lg:w-3/5 lg:pr-0 pr-0">
                <h1 className="title-font font-medium font-bold text-5xl text-white">
                  Chúng tôi còn hơn cả PHIM
                </h1>
                <p className="leading-relaxed mt-4 text-white text-4xl">
                  Chúng tôi là cinema
                </p>
              </div>
              <div className="lg:w-2/6 xl:w-2/5 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5 block text-sm font-semibold">
                  Đăng nhập
                </h2>

                
                  </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="full-name"
                    className="leading-7 text-sm text-gray-600 block text-sm font-semibold"
                  >
                    Email
                  </label>
                  <Field
                    required
                    type="text"
                    name="email"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <a className="errors text-sm text-red-700 ">
                    <ErrorMessage name="email" />
                  </a>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600 block text-sm font-semibold"
                  >
                    Mật khẩu
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <a className="errors text-sm text-red-700 ">
                    <ErrorMessage name="password" />
                  </a>
                </div>

                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Đăng nhập
                </button>
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                  {" "}
                  Bạn chưa có tài khoản?{" "}
                  <a
                    href="/dang-ky"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Đăng ký
                  </a>
                </p>
              </div>
            </div>
          </section>
        </Form>
      </Formik>
    );
  };
}
