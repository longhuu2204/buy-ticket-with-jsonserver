import { Fragment, Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import Banner from "./components/banner/Banner";
import Advertisement from "./components/advertisement/ads";
import MovieList from "./components/movie/MovieList";
import { Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
const HomePage = lazy(() => import("./pages/HomePage"));
export default function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route
            element={
              <>
                <Header></Header>
                <Banner></Banner>
                <MovieList></MovieList>
                <Advertisement></Advertisement>
              </>
            }
          >
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <MovieList></MovieList>
                  <Advertisement></Advertisement>
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
          </Route>
          {/* <div className="mx-auto bg-[#fdfcf0] overflow-hidden">
          <Header></Header>
          <Banner></Banner>
          <MovieList></MovieList>
          <Advertisement></Advertisement>
        </div> */}
        </Routes>
      </Suspense>
    </Fragment>
  );
}
