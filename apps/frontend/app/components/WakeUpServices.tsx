"use client";
import { useEffect } from "react";

export default function WakeUpServices() : null {
  useEffect(() => {
    fetch("https://syncsketch-2.onrender.com/api/ping").catch(() => {});
    fetch("https://syncsketch-ws.onrender.com").catch(() => {});
  }, []);
  return null;
}
