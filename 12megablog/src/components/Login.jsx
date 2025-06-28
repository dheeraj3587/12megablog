import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Logo, Button, Input } from "./index";
import authService from "../appwrite/auth";
import appwriteService from "../appwrite/config";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) {
          localStorage.setItem("UserData", JSON.stringify(userData));

          dispatch(authLogin(userData));

          appwriteService.getPosts(userData.$id).then((posts) => {
            sessionStorage.setItem("userPost", JSON.stringify(posts.documents));
          });
          appwriteService.getPost().then((posts) => {
            sessionStorage.setItem("allPost", JSON.stringify(posts.documents));
          });
        }

        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
      <div className="relative w-full max-w-lg">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>

        <div className="relative z-10 p-8 md:p-12">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 transform hover:scale-110">
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Logo width="80px" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-white/70">
              Don&apos;t have any account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors duration-300 underline decoration-cyan-300/50">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
              <p className="text-red-200 text-center font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full mt-8" variant="primary">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
