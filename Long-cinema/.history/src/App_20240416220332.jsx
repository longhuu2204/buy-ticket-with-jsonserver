import { Fragment } from "react";
import Header from "./components/layout/Header";
import Banner from "./components/banner/Banner";
import ads from "./components/advertisement/ads";
export default function App() {
  return (
    <Fragment>
      <div className="mx-auto bg-[#fdfcf0] overflow-hidden">
        <Header></Header>
        <Banner></Banner>
        <ads></ads>
      </div>
    </Fragment>
  );
}
