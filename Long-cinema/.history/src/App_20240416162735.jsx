import { Fragment } from "react";
import Header from "./components/layout/Header";

export default function App() {
  return (
    <Fragment>
      <div className="mx-auto max-w-7xl bg-black">
        <Header></Header>;
      </div>
    </Fragment>
  );
}
