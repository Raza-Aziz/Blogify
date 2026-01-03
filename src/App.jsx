import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // get current user trying to login
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          // if found, update state userData
          dispatch(login({ userData }));
        } else {
          // else keep logged out and update state to false and null
          dispatch(logout());
        }
      })
      // finally, setLoading to false to show the result (logged in or out)
      .finally(() => setLoading(false));
  }, [dispatch, setLoading]);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-blue-950">
      <div className="w-full block">
        <Header />
        <main>{/* <Outlet />*/}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
