import { Fragment } from "react";
import Header from "./components/layout/Header";
import Banner from "./components/banner/Banner";

export default function App() {
  return (
    <Fragment>
      <div className="mx-auto bg-[#fdfcf0]">
        <Header></Header>
        <Banner></Banner>
      </div>
    </Fragment>
  );
}
