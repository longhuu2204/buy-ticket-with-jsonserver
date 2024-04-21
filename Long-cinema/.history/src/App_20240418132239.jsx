import { Fragment, Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import Banner from "./components/banner/Banner";
import Advertisement from "./components/advertisement/ads";
import MovieList from "./components/movie/MovieList";
const HomePage = lazy(() => import("./pages/HomePage"));
export default function App() {
  return (
    <Fragment>
      <Suspense>
        <div className="mx-auto bg-[#fdfcf0] overflow-hidden">
          <Header></Header>
          <Banner></Banner>
          <MovieList></MovieList>
          <Advertisement></Advertisement>
        </div>
      </Suspense>
    </Fragment>
  );
}
