import React, { useState } from "react";
import { Container, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const dispatch = useDispatch();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "My posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "Inactive Posts",
      slug: "/inactive-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  // logout handle
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());

      localStorage.clear();
      sessionStorage.clear();
      // to reset scroll position
      window.scrollTo({ top: 0, behavior: "auto" });
      sessionStorage.setItem("manualScrollReset", "true");
      navigate("/");
    });
  };

  return (
    <header className="py-4 sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      {/* Logout confirm popup */}
      {logoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white/90 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl transform transition-all">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Confirm logout
            </h2>
            <hr className="w-[16rem] my-4 border-gray-200" />
            <h3 className="font-semibold text-gray-700">
              Are you sure you want to log out?
            </h3>

            <div className="flex justify-around mt-8 gap-4">
              <button
                className="px-6 py-2 font-semibold border-2 border-gray-300 text-gray-600 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                onClick={() => setLogoutConfirm(false)}>
                Cancel
              </button>

              <button
                className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => {
                  logoutHandler();
                  setLogoutConfirm(false);
                }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <Container>
        <nav className="flex w-full items-center">
          {/* Logo */}
          <div className="mr-4">
            <Link
              to="/"
              className="transform hover:scale-105 transition-transform duration-300">
              <Logo width="70px" />
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="sm:hidden flex ml-auto">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden sm:flex ml-auto items-center space-x-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      // Reset scroll manually for only Home and All Posts
                      if (item.slug === "/" || item.slug === "/my-posts") {
                        sessionStorage.setItem("manualScrollReset", "true");
                      }
                      navigate(item.slug);
                    }}
                    className="px-4 py-2 text-white/90 font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 transform hover:scale-105">
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {authStatus && (
              <li>
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="px-4 py-2 text-white/90 font-medium rounded-full bg-gradient-to-r from-red-500/80 to-pink-500/80 backdrop-blur-sm border border-white/20 hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105">
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu */}
          <div
            className={`absolute top-full left-0 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-b-2xl shadow-2xl sm:hidden transform transition-all duration-300 ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-0"
            }`}>
            <ul className="flex flex-col p-4 space-y-2">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (item.slug === "/" || item.slug === "/my-posts") {
                            sessionStorage.setItem("manualScrollReset", "true");
                          }
                          navigate(item.slug);
                        }}
                        className="w-full text-left px-4 py-3 text-white/90 font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300">
                        {item.name}
                      </button>
                    </li>
                  ),
              )}
              {authStatus && (
                <li>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setLogoutConfirm(true);
                    }}
                    className="w-full text-left px-4 py-3 text-white/90 font-medium rounded-lg bg-gradient-to-r from-red-500/80 to-pink-500/80 hover:from-red-500 hover:to-pink-500 transition-all duration-300">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
