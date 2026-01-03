import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function LogOutBtn() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authService.logout().then(dispatch(logout()));
  };

  return (
    <button
      className="inline-block px-6 py-2 hover:bg-blue-400 duration-200 rounded-full"
      onClick={logOutHandler}
    >
      Logout
    </button>
  );
}

export default LogOutBtn;
