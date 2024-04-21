import { Fragment } from "react";
import Header from "./components/layout/Header";
import Banner from "./components/banner/Banner";
import Advertisement from "./components/advertisement/ads";
import MovieList from "./components/movie/MovieList";
export default function App() {
  return (
    <Fragment>
      <div className="mx-auto bg-[#fdfcf0] overflow-hidden">
        <Header></Header>
        <Banner></Banner>
        <MovieList
        <Advertisement></Advertisement>
      </div>
    </Fragment>
  );
}
