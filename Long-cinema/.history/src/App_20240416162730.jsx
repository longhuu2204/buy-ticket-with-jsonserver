import { Fragment } from "react";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <Fragment>
      <div className="m-auto max-w-7xl bg-black">
        <Header></Header>;
      </div>
    </Fragment>
  );
}
