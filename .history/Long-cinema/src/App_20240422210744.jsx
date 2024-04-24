import { Fragment, Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatPage from "./pages/SeatPage";
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
                <Outlet></Outlet>
              </>
            }
          >
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/movies/:movieId/booking"
              element={<SeatPage></SeatPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}
