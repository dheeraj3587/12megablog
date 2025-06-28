import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";

function Home() {
  const state = useSelector((state) => state.auth.status);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const [postAvailable, setPostAvailable] = useState(true);

  useEffect(() => {
    const getPost = sessionStorage.getItem("allPost");
    if (getPost != "undefined" && getPost) {
      setPosts(JSON.parse(getPost));
    } else {
      appwriteService.getPost().then((posts) => {
        setPosts(posts.documents);
      });
    }
  }, [offset, limit]);

  // load new posts
  const loadPost = (lim, offse) => {
    const newLimit = limit + lim;
    const newOffset = offset + offse;

    appwriteService.getPost(lim, newOffset).then((newPost) => {
      if (newPost.documents) {
        const updatedPosts = [...posts, ...newPost.documents];
        setPosts(updatedPosts); // Update posts state
        sessionStorage.setItem("allPost", JSON.stringify(updatedPosts)); // Update sessionStorage

        if (updatedPosts.length < newLimit) {
          setPostAvailable(false);
        }
      }
    });
    setLimit(newLimit);
    setOffset(newOffset);
  };

  if (!state) {
    return (
      <div className="w-full py-16 mt-8">
        <Container>
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center max-w-md">
              <div className="mb-8 p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent mb-4">
                  Authentication Required
                </h1>
                <p className="text-white/70 mb-6">
                  Please sign in to access our amazing collection of blog posts
                  and join our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
                    Sign In
                  </button>
                  <button
                    onClick={() => (window.location.href = "/signup")}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <Container>
        {/* Header section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent mb-4">
            Discover Amazing Stories
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Explore a curated collection of insights, tutorials, and stories
            from our community of writers.
          </p>
        </div>

        {/* Posts grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-6">
          {state &&
            posts.map((post) => (
              <div
                key={post.$id}
                className="mb-4 lg:mb-6 break-inside-avoid w-full">
                <PostCard {...post} />
              </div>
            ))}
        </div>

        {/* Load more button */}
        {postAvailable && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => loadPost(15, 15)}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <span className="flex items-center gap-2">
                Load More Posts
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
