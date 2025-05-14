import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({
  color = "#3B82F6",
  size = 40,
  loading = true,
  cssOverride = {
    borderWidth: "5px",
  },
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ClipLoader
        color={color}
        size={size}
        loading={loading}
        cssOverride={cssOverride}
      />
    </div>
  );
};

export default Spinner;

export const BtnSpinner = ({
  color = "##f8fafc",
  size = 26,
  cssOverride = {
    display: "inline-block",
    margin: "0",
    verticalAlign: "middle",
  },
}) => {
  return <ClipLoader color={color} size={size} cssOverride={cssOverride} />;
};
