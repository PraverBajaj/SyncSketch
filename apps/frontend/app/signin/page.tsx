"use client";

import AuthComp from "../components/authcomp";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthComp isSignup={false} />
    </div>
  );
}
