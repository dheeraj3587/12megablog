import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="relative w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 group-hover:bg-white/15">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10">
          <div className="w-full flex justify-center mb-4 overflow-hidden rounded-xl">
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-auto rounded-xl object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Glowing text effect */}
          <div className="relative">
            <h2 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300 line-clamp-2">
              {title}
            </h2>

            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {title}
            </div>
          </div>
        </div>

        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm transform scale-105"></div>
      </div>
    </Link>
  );
}

export default PostCard;
