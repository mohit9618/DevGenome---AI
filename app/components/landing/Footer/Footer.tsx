"use client";

import Link from "next/link";
import {
  // Github,
  // LinkedinIcon,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="footer footer-horizontal footer-center bg-base-300 text-base-content rounded p-10"
    >

      <aside>

        <h2 className="text-3xl font-bold text-primary">
          DevGenome AI
        </h2>

        <p className="max-w-xl opacity-70">
          An AI-powered career platform that helps developers
          build resumes, prepare for interviews,
          track coding profiles, and land their dream jobs.
        </p>

      </aside>

      <nav className="grid grid-flow-col gap-6">

        <Link href="/">Home</Link>

        <Link href="#features">Features</Link>

        <Link href="#how-it-works">How It Works</Link>

        <Link href="/signin">Sign In</Link>

      </nav>

      <nav>

        <div className="grid grid-flow-col gap-6">

          {/* <a href="#">
            <Github size={24} />
          </a> */}

          {/* <a href="#">
            <LinkedinIcon size={24} />
          </a> */}

          <a href="mailto:your@email.com">
            <Mail size={24} />
          </a>

        </div>

      </nav>

      <aside>

        <p>
          © {new Date().getFullYear()} DevGenome AI. All Rights Reserved.
        </p>

      </aside>

    </footer>
  );
}