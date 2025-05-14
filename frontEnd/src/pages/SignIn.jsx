import { AuthForm } from "../components";
import { useLoginUserMutation } from "../Redux/api/authApi.js";
import { setLoggedInUser } from "../redux/feature/authSlice.js";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  successToast,
  errorToast,
} from "../components/common/ToastNotification.jsx";
import React from "react";

export default function SignIn() {
  const loggedInUser = useSelector((state) => state.auth.userData);
  console.log("loggedInUser", loggedInUser);

  const dispatch = useDispatch();

  const [loginUser, { isLoading, isError, error, isSuccess, data, status }] =
    useLoginUserMutation();

  console.log("is Success is ", isSuccess);

  const submit = async (data) => {
    const result = await loginUser(data);
    console.log(result);
    if (result?.error) {
      errorToast(result.error.data?.message || "User Login failed");
    } else {
      successToast(result?.data?.message || "User Logged in successfully");
      dispatch(setLoggedInUser(result?.data?.data));
    }
  };

  console.log("i am here from here i will throw u to home");

  return loggedInUser && loggedInUser._id ? (
    <Navigate to="/" replace={true} />
  ) : (
    <AuthForm type="signin" isLoading={isLoading} submit={submit} />
  );
}
