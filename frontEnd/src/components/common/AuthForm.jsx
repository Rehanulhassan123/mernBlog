import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimationWrapper, InputBox, Button, BtnSpinner } from "./index";
import {
  GoogleIcon,
  UserIcon,
  EnvelopeIcon,
  LockIcon,
  EyePasswordIcon,
} from "./icons";

export default function AuthForm({ type = "", submit, isLoading = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/v1/google";
  };

  return (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover justify-center items-center flex mt-9 md:mt-5">
        <form
          className="rounded-lg max-w-[400px] p-8 w-[80%] "
          noValidate
          onSubmit={handleSubmit(submit)}
        >
          <h1 className="text-3xl text-[var(--color-main-heading)] text-center capitalize font-gelasio mb-7">
            Join Us Today
          </h1>
          {/* input feilds */}
          {type?.trim().toLowerCase() === "signup" && (
            <div className="input-wrapper mb-4 ">
              <div className="relative mb-2 w-[100%]">
                <InputBox
                  type="text"
                  placeholder="username"
                  className="input-custom w-[100%] rounded-md p-3 pl-10 border border-[var(--color-input-border)]"
                  {...register("userName", {
                    required: "username is required",
                    minLength: {
                      value: 4,
                      message: "username must be atleast 4 letters long",
                    },
                    validate: (value) =>
                      /^[A-Za-z0-9]{4,}$/.test(value) ||
                      "Please Enter Valid username",
                  })}
                />

                <UserIcon className=" absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-text-primary)]" />
              </div>
              {errors.userName && (
                <p className="text-[var(--validation-error)]  ">
                  {errors.userName.message}
                </p>
              )}
            </div>
          )}
          <div className="input-wrapper mb-4 ">
            <div className="relative mb-2 w-[100%]">
              <InputBox
                type="email"
                placeholder="email"
                className="input-custom w-[100%] rounded-md p-3 pl-10 border border-[var(--color-input-border)]"
                {...register("email", {
                  required: "email is required",
                  pattern: {
                    value: /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid Email ",
                  },
                })}
              />

              <EnvelopeIcon className="absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-text-primary)]" />
            </div>
            {errors.email && (
              <p className="text-[var(--validation-error)]  mb-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="input-wrapper mb-4 ">
            <div className="relative mb-2 w-[100%]">
              <InputBox
                type={isPasswordVisible ? "text" : "password"}
                placeholder="password"
                className="input-custom w-[100%] rounded-md p-3 pl-10 border border-[var(--color-input-border)]"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 5,
                    message: "password must be atleast 5 letters long",
                  },
                })}
              />

              <LockIcon className=" absolute top-1/2 left-4 -translate-y-1/2 text-[var(--color-text-primary)]" />

              <Button
                type="button"
                className="absolute cursor-pointer top-1/2 right-4 left-auto -translate-y-1/2"
                onClick={() => {
                  setIsPasswordVisible((prev) => !prev);
                }}
              >
                <EyePasswordIcon isPasswordVisible={isPasswordVisible} />
              </Button>
            </div>
            {errors.password && (
              <p className="text-[var(--validation-error)]  mb-2 ">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* buttons  */}
          <Button
            type="submit"
            className="btn-primary whitespace-nowrap mt-6 rounded-full py-2 px-4 text-[16px] block w-[40%] mx-auto capitalize"
            children={
              isLoading ? (
                <BtnSpinner />
              ) : type?.trim() === "signup" ? (
                "Sign Up"
              ) : (
                "Sign In"
              )
            }
            disabled={isLoading}
          />

          <div className="mt-6 flex w-full font-bold relative items-center gap-2">
            <hr className="w-1/2  bg-[var(--color-border)]" />
            <span className=" capitalize text-[var(--color-text-primary)]">
              OR
            </span>
            <hr className="w-1/2 h bg-[var(--color-border)]" />
          </div>
          <Button
            type="button"
            className="btn-secondary whitespace-nowrap mt-4 flex items-center justify-center gap-4 rounded-full py-2 px-4 text-[18px]  w-[90%] mx-auto  capitalize"
            children={"Continue with Google"}
            onClick={handleGoogleLogin}
          >
            <GoogleIcon className="w-5 md:w-6 block" />
            <p className="text-[14px] md:text-[16px]">Continue with Google</p>
          </Button>
          {type?.trim() === "signin" && (
            <p className="mt-5 text-center text-[14px] md:text-[15px]">
              Don't have an account ?
              <Link
                to="/signup"
                className="text-[var(--color-link)] whitespace-nowrap hover:text-[var(--color-link-hover)] underline ml-1"
              >
                Join Us Today
              </Link>
            </p>
          )}
          {type?.trim() === "signup" && (
            <p className="mt-5 text-center text-[14px] md:text-[15px]">
              Already a member ?
              <Link
                to="/signin"
                className="text-[var(--color-link)] whitespace-nowrap hover:text-[var(--color-link-hover)] underline ml-1"
              >
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}
