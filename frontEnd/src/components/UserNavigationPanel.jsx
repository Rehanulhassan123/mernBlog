import React from "react";
import { AnimationWrapper } from "./common";
import { Link } from "react-router-dom";
import { EditIcon, SearchIcon, Logo, BellIcon } from "./common/icons";
import { useSelector, useDispatch } from "react-redux";
import { getUserAuthData, setlogoutUser } from "../redux/feature/authSlice";

function UserNavigationPanel({ ...props }) {
  const user = useSelector(getUserAuthData);
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(setlogoutUser());
  };

  return (
    <AnimationWrapper
      className="absolute right-2 top-18 z-50   "
      transition={{ duration: 2 }}
    >
      <div
        className="absolute right-0 bg-[var(--color-nav-bg)] rounded-xl border border-[var(--color-border)] overflow-hidden w-55 duration-200   "
        onClick={props.onClick}
      >
        <Link
          to={"/write"}
          className=" hidden md:flex gap-2 hover:bg-[var(--color-btn-secondary-hover)] pl-8 py-4 "
        >
          <EditIcon className="w-5 h-5" />
          <p>Write</p>
        </Link>
        <Link
          to={`/user/${user?.personalInfo.userName}`}
          className="flex gap-2 hover:bg-[var(--color-btn-secondary-hover)] pl-8 py-4 "
        >
          Profile
        </Link>
        <Link
          to={`/dashboard/blogs`}
          className="flex gap-2 hover:bg-[var(--color-btn-secondary-hover)] pl-8 py-4 "
        >
          Dashboard
        </Link>
        <Link
          to={"/setting/edit-profile"}
          className="flex gap-2 hover:bg-[var(--color-btn-secondary-hover)] pl-8 py-4 "
        >
          Settings
        </Link>
        <span className="absolute border border-[var(--color-border)] w-[100%] block"></span>
        <button
          className=" hover:bg-[var(--color-btn-secondary-hover)] pl-8 py-4  w-full text-left"
          onClick={signOut}
        >
          <h1 className="font-bold mb-1  ">Sign Out</h1>
          <p>@{user?.personalInfo.userName}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
}

export default UserNavigationPanel;
