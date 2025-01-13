import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full  h-[4rem] px-6 py-2 z-50 text-white ">
      <section className="flex justify-between items-center h-full">
        {/* Section 1: Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-y-[-2px]"
          >
            <AiOutlineHome className="mr-2" size={26} />
            <span>Home</span>
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:translate-y-[-2px]"
          >
            <MdOutlineLocalMovies className="mr-2" size={26} />
            <span>Movies</span>
          </Link>
        </div>

        {/* Section 2: User Info and Dropdown */}
        <div className="relative">
          {userInfo ? (
            <button
              onClick={toggleDropdown}
              className="text-gray-300 focus:outline-none flex items-center space-x-2"
            >
              <span>{userInfo.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${
                  dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </button>
          ) : (
            <span className="text-gray-400">Guest</span>
          )}

          {dropdownOpen && userInfo && (
            <ul className="absolute right-0 top-[3rem] bg-white text-gray-700 shadow-lg rounded-lg w-[10rem]">
              {userInfo.isAdmin && (
                <li>
                  <Link
                    to="/admin/movies/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}

          {!userInfo && (
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/login"
                  className="flex items-center transition-transform transform hover:translate-y-[-2px]"
                >
                  <AiOutlineLogin className="mr-2" size={26} />
                  <span>Login</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="flex items-center transition-transform transform hover:translate-y-[-2px]"
                >
                  <AiOutlineUserAdd className="mr-2" size={26} />
                  <span>Register</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
