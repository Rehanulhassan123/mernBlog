import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, InputBox } from "./common";
import { EditIcon, SearchIcon, Logo, BellIcon } from "./common/icons";
import { getUserAuthData } from "../redux/feature/authSlice";
import { useSelector } from "react-redux";
import { UserNavigationPanel } from "./index";

export default function NavBar() {
  const [searchBoxVisibility, setSearchBoxVisibility] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector(getUserAuthData);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);

  // console.log(user);

  return (
    <>
      <nav className="navbar ">
        <Logo className="w-12 flex-none bg-transparent " />
        <div
          className={`absolute top-[70%]  w-full left-0 px-4 py-[4vw] border-b border-Color md:p-0  md:inset-0  md:border-0 md:relative ${
            searchBoxVisibility
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } md:opacity-100 md:pointer-events-auto
 `}
        >
          <InputBox
            className={`w-full rounded-full p-3 pl-9 pr-[11%] border input-custom font-normal md:w-auto md:pr-6 md:pl-12 `}
            type="text"
            placeholder="Search"
          />

          <SearchIcon className="absolute top-1/2 right-[9%] -translate-y-1/2 md:pointer-events-none md:left-5" />
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <Button
            className=" rounded-full md:hidden hover:bg-gray-900"
            onClick={() => setSearchBoxVisibility((prev) => !prev)}
          >
            <SearchIcon className="w-6 h-6" />
          </Button>
          <Link
            to={"/write"}
            className=" hidden md:flex gap-2 hover:bg-[var(--color-btn-secondary-hover)] p-2 "
          >
            <EditIcon />
            <p>Write</p>
          </Link>
          {user && user._id ? (
            <>
              <Link
                to={`/dashboard/notification`}
                className=" p-2 rounded-full  relative  transition-all"
              >
                <BellIcon className="w-5 h-5" />
              </Link>
              <Link
                className="w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen((prev) => !prev);
                }}
              >
                <img
                  src={user.personalInfo.profile_img}
                  className="w-full h-full rounded-full object-cover"
                />
              </Link>
              {open && (
                <UserNavigationPanel onClick={(e) => e.stopPropagation()} />
              )}
            </>
          ) : (
            <>
              <Link
                to={"/signin"}
                className="btn-primary px-5 py-2 rounded-full  capatilize whitespace-nowrap  transition-all"
              >
                Sign In
              </Link>
              <Link
                to={"/signup"}
                className="btn-secondary px-5 py-2 rounded-full  capatilize whitespace-nowrap  transition-all hidden md:block"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}
