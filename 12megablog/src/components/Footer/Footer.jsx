import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "../index";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden py-16 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-md border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-cyan-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-6">
                <div className="mb-4 inline-flex items-center">
                  <Logo width="100px" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-md">
                  Discover amazing stories and share your thoughts with our
                  modern blogging platform. Join our community of writers and
                  readers.
                </p>
              </div>
              <div>
                <p className="text-sm text-white/50">
                  &copy; Copyright {year}. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase text-white/80 tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      className="text-white/60 hover:text-white font-medium transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      to="/">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="mb-6 text-sm font-semibold uppercase text-white/80 tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {["Account", "Help", "Contact Us", "Customer Support"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      className="text-white/60 hover:text-white font-medium transition-colors duration-300 hover:translate-x-1 transform inline-block"
                      to="/">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Bottom section with legal links */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
              {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                (item) => (
                  <Link
                    key={item}
                    className="text-white/50 hover:text-white/80 text-sm font-medium transition-colors duration-300"
                    to="/">
                    {item}
                  </Link>
                ),
              )}
            </div>

            {/* Social gradient accent */}
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
