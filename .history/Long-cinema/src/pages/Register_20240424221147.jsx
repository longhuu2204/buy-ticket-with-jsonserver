import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Bắt buộc!"),
  password: Yup.string()
    .required("Bắt buộc!")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  confirmPassword: Yup.string()
    .required("Bắt buộc!")
    .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp"),
});

const Register = () => {
  const navigate = useNavigate();

  const checkExistingEmail = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/account?email=${email}`
      );
      return response.data.length > 0;
    } catch (error) {
      console.error("Lỗi khi kiểm tra email tồn tại:", error);
      return false;
    }
  };

  const handleRegister = async (values) => {
    const { email } = values;
    const isExistingEmail = await checkExistingEmail(email);

    if (isExistingEmail) {
      alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
      return;
    }

    axios
      .post("http://localhost:3000/account", values)
      .then((response) => {
        console.log("Đăng ký thành công!", response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi đăng ký:", error);
        alert("Đã xảy ra lỗi khi đăng ký.");
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        handleRegister(values);
      }}
    >
      <Form>
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center justify-center">
          <div className="lg:w-2/6 xl:w-2/5 md:w-2/3 bg-gray-100 rounded-lg p-8 flex flex-col lg:ml-auto w-full mt-10 lg:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5 block text-sm font-semibold">
              Đăng ký
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600 block text-sm font-semibold"
              >
                Email
              </label>
              <Field
                required
                type="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <a className="errors text-sm text-red-700">
                <ErrorMessage name="email" />
              </a>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600 block text-sm font-semibold"
              >
                Mật khẩu
              </label>
              <Field
                type="password"
                name="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <a className="errors text-sm text-red-700">
                <ErrorMessage name="password" />
              </a>
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="confirmPassword"
                className="leading-7 text-sm text-gray-600 block text-sm font-semibold"
              >
                Nhập lại mật khẩu
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <a className="errors text-sm text-red-700">
                <ErrorMessage name="confirmPassword" />
              </a>
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Đăng ký
            </button>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Bạn đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/login")}
                className="font-medium text-purple-600 hover:underline cursor-pointer"
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
