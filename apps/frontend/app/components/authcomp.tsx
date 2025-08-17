"use client";
import { getAPIUrl } from "../../lib/api-utils";
import { WEB_URL } from "../config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./loader";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AuthComp({ isSignup }: { isSignup: boolean }) {
const router = useRouter();

useEffect(() => {
  AOS.init({ duration: 600, once: true });
}, []);
useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.replace("/roomsdashboard");
  }
}, [router]);

useEffect(() => {
    function handleEnterKey(e: KeyboardEvent) {
      if (e.key === "Enter") {
        const email = emailInputRef.current?.value.trim();
        const pass = passInputRef.current?.value.trim();
        const name = nameInputRef.current?.value.trim();

        if (!email || !pass || (isSignup && !name)) {
          toast.warning("Please fill out all the required fields");
          return;
        }

        isSignup ? signup() : signin();
      }
    }

    document.addEventListener("keydown", handleEnterKey);
    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, [isSignup]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function signup() {
    const email = emailInputRef.current?.value;
    const password = passInputRef.current?.value;
    const name = nameInputRef.current?.value;
    try {
      setLoading(true);
      await axios.post(`${WEB_URL}/signup`, { email, password, name });
      alert("Signup successful! You can now sign in.");
      toast.success("You have successfully signed up!");
      router.push("/signin");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (err.code === "ECONNABORTED"
          ? "Network timeout. Try again."
          : err.message?.includes("Network Error")
            ? "Network error. Check your internet."
            : "Signup failed. Please try again later.");
      toast.warning(message);
    } finally {
      setLoading(false);
    }
  }

  async function signin() {
    const email = emailInputRef.current?.value;
    const password = passInputRef.current?.value;
    try {
      setLoading(true);
      const res = await axios.post(`${WEB_URL}/signin`, { email, password });
      toast.success("You have successfully signed in!");
      localStorage.setItem("token", res.data.token);
      router.push("/roomsdashboard");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        (err.code === "ECONNABORTED"
          ? "Network timeout. Try again."
          : err.message?.includes("Network Error")
            ? "Network error. Check your internet."
            : "Signin failed. Please try again later.");
      toast.warning(message);
    } finally {
      setLoading(false); // <-- Ensures loader always resets
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-800 overflow-hidden">
      {/* Animated Doodles Background */}
      <div className="absolute inset-0 -z-10">
        {/* Pen */}
        <svg
          className="absolute top-12 left-8 w-14 h-14 opacity-20 animate-floatSlow"
          fill="none"
          stroke="#888"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
          <path d="M12 20h9" />
        </svg>

        {/* Pencil */}
        <svg
          className="absolute top-40 right-12 w-16 h-16 opacity-15 animate-float"
          fill="none"
          stroke="#aaa"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 19l7-7 3 3-7 7z" />
          <path d="M18 13l-6 6" />
          <path d="M2 22l7-7" />
          <path d="M7 15l5-5" />
        </svg>

        {/* Sketch Lines */}
        <svg
          className="absolute bottom-24 left-20 w-36 h-36 opacity-10 animate-floatSlowReverse"
          fill="none"
          stroke="#666"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <path d="M10 80c20-20 40-40 60-60" />
          <path d="M15 85c25-15 35-35 50-50" />
          <path d="M20 90c30-10 30-30 40-40" />
        </svg>
      </div>

      <div
        data-aos="zoom-in"
        className="relative z-10 w-full max-w-md bg-[#1a1a1a] border border-neutral-800 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Welcome to
        </h1>
        <h2 className="text-4xl font-extrabold text-center text-zinc-200 mb-6">
          SyncSketch
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-400"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="demo@example.com"
              ref={emailInputRef}
              className="w-full mt-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-400"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              ref={passInputRef}
              className="w-full mt-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
            />
          </div>
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-400"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                ref={nameInputRef}
                className="w-full mt-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
              />
            </div>
          )}

          <button
            disabled={loading}
            onClick={() => {
              const email = emailInputRef.current?.value.trim();
              const pass = passInputRef.current?.value.trim();
              const name = nameInputRef.current?.value.trim();
              if (!email || !pass || (isSignup && !name)) {
                toast.warning("Please fill out all the required fields");
                return;
              }
              isSignup ? signup() : signin();
            }}
            className="w-full mt-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 rounded-xl transition duration-150"
          >
            {loading ? <Loader /> : isSignup ? "Sign Up" : "Sign In"}
          </button>

          <p className="text-center text-sm text-zinc-400 mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              href={isSignup ? "/signin" : "/signup"}
              className="underline hover:text-zinc-200"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes floatSlow {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-10px) translateX(6px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        @keyframes floatSlowReverse {
          0% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(10px) translateX(-6px);
          }
          100% {
            transform: translateY(0px) translateX(0px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 8s ease-in-out infinite;
        }
        .animate-floatSlowReverse {
          animation: floatSlowReverse 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
