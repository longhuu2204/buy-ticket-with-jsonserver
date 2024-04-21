/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "
        #e71a0f",
        secondary: "#FFFF00",
      },
      backgroundImage: {
        "header-bg-img":
          "url('	https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/bg-top.png')",
        "banner-bg-img":
          "url('	https://www.cgv.vn/skin/frontend/cgv/default/images/bg_c_bricks.png')",
      },
    },
  },
  plugins: [],
};
