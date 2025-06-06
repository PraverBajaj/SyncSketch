"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SocketCanvas } from "../components/SocketConnectCanvas";

export default function ClientCanvasPage({ roomId }: { roomId: string }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("You are not signed in");
      router.push("/signin");
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <SocketCanvas roomId={roomId} />;
}
