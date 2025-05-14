import { AuthForm } from "../components";
import { useRegisterUserMutation } from "../Redux/api/authApi.js";
import {
  successToast,
  errorToast,
} from "../components/common/ToastNotification.jsx";
import React, { useEffect } from "react";

export default function SignUp() {
  const [registerUser, { isLoading, isError, error, isSuccess, data, status }] =
    useRegisterUserMutation();
  console.log(isError, error, isSuccess, data, status);
  const submit = async (data) => {
    const result = await registerUser(data);

    console.log(result);
    if (result?.error) {
      errorToast(result.error.data?.message || "User registration failed");
    } else {
      successToast(result?.data?.message || "User registered successfully");
    }
  };

  return <AuthForm type="signup" isLoading={isLoading} submit={submit} />;
}
