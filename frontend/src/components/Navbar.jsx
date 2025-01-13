import React, { useState } from "react";
import menu from "../assets/menu.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/auth/logout", {}, { withCredentials: true });
      setUser(null); // Clear user state in the frontend
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="w-full fixed top-0 z-50 bg-white shadow-md h-[50px] flex items-center"> {/* Increased height */}
      <div className="flex justify-between items-center w-full md:max-w-[1240px] m-auto px-4">
        {/* Left Section: Mobile Menu Button */}
        <div className="flex items-center">
          <button onClick={toggleMenu} className="block sm:hidden mr-4">
            <img src={menu} alt="menu" className="w-6 h-6 cursor-pointer" />
          </button>
          <Link
            to="/hotels"
            className="text-black text-lg font-medium cursor-pointer hidden sm:block"
          >
            Home
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="block sm:hidden absolute top-full left-0 w-[40%] bg-white shadow-md">
            <ul className="flex flex-col items-start p-4">
              <li className="cursor-pointer mb-2">
                <Link to="/hotels">Home</Link>
              </li>
              {!user && (
                <li className="cursor-pointer mb-2">
                  <Link to="/login">Login</Link>
                </li>
              )}
              {user && (
                <>
                  <li
                    className="cursor-pointer mb-2"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </li>
                  <li className="cursor-pointer" onClick={handleLogout}>
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Right Section: User Actions */}
        <div className="hidden sm:flex sm:mr-10 md:mr-10 relative">
          {user ? (
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(false)}
            >
              <span className="text-black text-lg font-medium cursor-pointer mr-4">
                {user.username}
              </span>
              {dropdownVisible && (
                <div className="absolute top-full right-0 bg-white shadow-md rounded-lg">
                  <ul className="flex flex-col text-sm text-gray-800">
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="text-black text-lg font-medium cursor-pointer mr-4">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



