import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser } from "../redux/feature/authSlice";
import { useDispatch } from "react-redux";
import { Spinner } from "./common";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    // console.log(hashParams, "Hash params");

    const accessToken = hashParams.get("token");
    const user = JSON.parse(hashParams.get("user"));
    // console.log(accessToken);
    // console.log(user);
    if (accessToken && user) {
      dispatch(setLoggedInUser(user)); // Ensure setLoggedInUser handles this correctly
      setLoading(false);
      navigate("/");
    }
  }, [dispatch, navigate]);

  return loading ? <Spinner size={56} /> : null;
};

export default GoogleAuthCallback;
