"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar fixed top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm px-5 lg:px-10">

      {/* Left */}
      <div className="navbar-start">

        {/* Mobile Menu */}
        <div className="dropdown">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h10M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 w-56 rounded-box bg-base-100 shadow"
          >
            <li>
              <a href="#features">Features</a>
            </li>

            <li>
              <a href="#how-it-works">How It Works</a>
            </li>

            <li>
              <a href="#footer">Contact</a>
            </li>
          </ul>
        </div>

        {/* Logo */}

        <Link
          href="/"
          className="text-3xl font-bold text-primary"
        >
          DevGenome
        </Link>

      </div>

      {/* Center */}

      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 text-base font-medium">

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#how-it-works">How It Works</a>
          </li>

          <li>
            <a href="#footer">Contact</a>
          </li>

        </ul>

      </div>

      {/* Right */}

      <div className="navbar-end gap-3">

        <Link
          href="/sign-in"
          className="btn btn-ghost"
        >
          Sign In
        </Link>

        <Link
          href="/sign-up"
          className="btn btn-primary"
        >
          Get Started
        </Link>

      </div>

    </div>
  );
}