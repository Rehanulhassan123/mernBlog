import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "./common";

const Protected = ({ authentication, children }) => {
  const navigate = useNavigate();
  let authStatus = useSelector((state) => state.auth?.userData?._id) || false;
  const [loader, setLoader] = useState(true);

  if (authStatus) {
    // console.log("authStatus", authStatus);
    authStatus = true;
  }

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/signin");
      // console.log("I am here in  login");
    } else if (!authentication && authStatus !== authentication) {
      // console.log(authStatus, authentication, "i am here in /");

      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  // console.log("authStatus", authStatus);
  // console.log("authentication", authentication);

  return loader ? <Spinner size={56} /> : <>{children}</>;
};

export default Protected;
