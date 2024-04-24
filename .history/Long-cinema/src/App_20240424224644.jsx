import { Fragment, Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import SeatPage from "./pages/SeatPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/my-ticket" element={<Register></Register>}></Route>

            <Route
              path="/movies/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route
              path="/showtimes/:showtimeId"
              element={<SeatPage></SeatPage>}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}
