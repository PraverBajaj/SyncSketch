"use client";
import { useEffect } from "react";

export default function WakeUpServices(): null {
  useEffect(() => {
    // Ping backend with a valid endpoint
    fetch("https://syncsketch-2.onrender.com/health").catch(() => {});
    // Attempt to open and immediately close a websocket connection to wake up the ws server
    try {
      const ws = new WebSocket("wss://syncsketch-ws.onrender.com");
      ws.onopen = () => ws.close();
    } catch {}
  }, []);
  return null;
}
