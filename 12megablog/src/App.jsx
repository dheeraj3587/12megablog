import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import appwriteService from "./appwrite/config";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollManager from "./components/ScrollManager";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Refetch posts on page refresh
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    if (userData != null) {
      // Fetch and set userPost
      appwriteService.getPosts(userData.$id).then((posts) => {
        sessionStorage.setItem("userPost", JSON.stringify(posts.documents));
      });

      // Fetch and set allPost
      appwriteService.getPost().then((posts) => {
        sessionStorage.setItem("allPost", JSON.stringify(posts.documents));
      });
    }
  }, []);

  return !loading ? (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 via-pink-800/20 to-cyan-800/20 animate-pulse"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}></div>

      <div className="relative z-10 min-h-screen flex flex-wrap content-between">
        <div className="w-full block">
          <Header />
          <ScrollManager />
          <main className="backdrop-blur-sm">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "0.8s",
          }}></div>
      </div>
    </div>
  );
}

export default App;
