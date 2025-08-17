"use client";

import AuthComp from "../components/authcomp";

// Environment-aware API URL function for AuthComp to use
export const getAPIUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:3009'
      : 'https://api.syncsketch.praverbajaj.tech';
  }
  return process.env.NODE_ENV === 'production' 
    ? 'https://api.syncsketch.praverbajaj.tech'
    : 'http://localhost:3009';
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthComp isSignup={false} />
    </div>
  );
}