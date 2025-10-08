import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/isLoggedIn", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) setLoggedIn(true);
    } catch (err) {
      console.error("Error checking login:", err);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const linkClasses = ({ isActive }) =>
    `relative text-lg font-medium transition-all duration-300 ${
      isActive ? "text-white" : "text-gray-400 hover:text-white"
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-white after:w-0 hover:after:w-full ${
      isActive ? "after:w-full" : ""
    } after:transition-all after:duration-300`;

  return (
    <div className="w-full z-[100] fixed top-0 left-0 flex justify-center items-center py-4 px-20 font-['Poppins']">
      <div className="w-full flex justify-between items-center px-20">
        {!loggedIn && (
          <NavLink to="/login" className={linkClasses}>
            Login
          </NavLink>
        )}

        <NavLink to="/" className={linkClasses}>
          Home
        </NavLink>

        {!loggedIn && (
          <NavLink to="/signup" className={linkClasses}>
            Signup
          </NavLink>
        )}

        {loggedIn && <Logout />}
      </div>
    </div>
  );
}
