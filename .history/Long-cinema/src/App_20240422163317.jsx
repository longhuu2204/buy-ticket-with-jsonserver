import { Fragment, Suspense, lazy } from "react";
import Header from "./components/layout/Header";
import { Outlet, Route, Routes } from "react-router-dom";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";
const HomePage = lazy(() => import("./pages/HomePage"));
export default function App() {
  return (
    <Fragment>
      <div className="overflow-hidden">
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
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Fragment>
  );
}
