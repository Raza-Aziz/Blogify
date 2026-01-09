import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Here, first authService.logout(), which will delete the session from backend (appwrite here),
  // then, the logout() will be dispatched, which will delete the user authentication status and userData
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <button
      className="inline-bock cursor-pointer text-xl font-[Poppins] font-semibold px-6 py-2 duration-200 hover:bg-[#e2f6e2] rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
