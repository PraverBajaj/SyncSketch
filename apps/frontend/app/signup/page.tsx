"use client";

import AuthComp from "../components/authcomp";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthComp isSignup={true} />
    </div>
  );
}
