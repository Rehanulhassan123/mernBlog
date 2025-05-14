import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";

import NavBar from "./navBar";
import React, { use } from "react";

export default function Layout() {
  const location = useLocation();
  const loadingBarRef = useRef(null);

  useEffect(() => {
    loadingBarRef.current.continuousStart();
    loadingBarRef.current.complete();
  }, [location.pathname]);

  return (
    <>
      <TopLoadingBar color="blue" height={1} ref={loadingBarRef} />
      <NavBar />
      <Outlet />
    </>
  );
}
