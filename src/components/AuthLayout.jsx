import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    {
      /*
    authentication means if the page requires authentication or not
    authStatus means if the user is authenticated or not in the redux state
    Easier code
    if (authentication === true && authStatus === false) {
      navigate("/login");
    }

    if (authentication === false && authStatus === true) {
      navigate("/");
    }
    */
    }

    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
