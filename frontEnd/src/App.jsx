import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./components/common";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Protected from "./components/Protected.jsx";
import GoogleAuthCallback from "./components/GoogleAuthCallback.jsx";
import { WriteBlog } from "./pages";

// Lazy-loaded pages
const SignIn = React.lazy(() => import("./pages/SignIn.jsx"));
const SignUp = React.lazy(() => import("./pages/SignUp.jsx"));
const Layout = React.lazy(() => import("./components/Layout.jsx"));
const Home = React.lazy(() => import("./pages/Home.jsx"));
const PublishBlog = React.lazy(() => import("./pages/PublishBlog.jsx"));

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={
            <Protected authentication={true}>
              <Suspense fallback={<Spinner size={56} />}>
                <Layout />
              </Suspense>
            </Protected>
          }
        >
          <Route
            path="/write"
            element={
              <Protected authentication={false}>
                <WriteBlog />
              </Protected>
            }
          />
          <Route
            path="/signin"
            element={
              <Protected authentication={false}>
                <Suspense fallback={<Spinner size={40} />}>
                  <SignIn />
                </Suspense>
              </Protected>
            }
          />
          <Route
            path="/signup"
            element={
              <Protected authentication={false}>
                <Suspense fallback={<Spinner size={40} />}>
                  <SignUp />
                </Suspense>
              </Protected>
            }
          />
          <Route
            path="/home"
            element={
              <Protected authentication={true}>
                <Suspense fallback={<Spinner size={40} />}>
                  <Home />
                </Suspense>
              </Protected>
            }
          />
          <Route
            path="/publish"
            element={
              <Protected authentication={false}>
                <Suspense fallback={<Spinner size={40} />}>
                  <PublishBlog />
                </Suspense>
              </Protected>
            }
          />
        </Route>
        <Route
          path="/auth/callback"
          element={
            <Protected authentication={false}>
              <Suspense fallback={<Spinner size={40} />}>
                <GoogleAuthCallback />
              </Suspense>
            </Protected>
          }
        />
      </>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
