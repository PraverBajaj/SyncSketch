"use client";
import {
  Navbar,
  NavBody,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/navbar-resizing";

import Link from "next/link";

import { useState, useEffect } from "react";
import React from "react";
import { GridBackgroundDemo } from "./components/gridbackgrounddemo";

import { getAPIUrlSimple } from "../lib/api-simple";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full dark bg-black text-white">
      <Navbar
        className={`fixed top-0 left-0 w-full z-50 pt-6 transition-all duration-300 ${
          isScrolled ? "shadow-none" : "shadow-none"
        }`}
      >
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <div className="flex items-center gap-4 ml-auto">
            <Link href="/signin">
              <NavbarButton variant="dark">Login</NavbarButton>
            </Link>
            <Link href="/signup">
              <NavbarButton variant="primary">Signup</NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex w-full flex-col gap-4">
              <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton variant="primary" className="w-full">
                  Login
                </NavbarButton>
              </Link>
              <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton variant="primary" className="w-full">
                  Signup
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <GridBackgroundDemo />
    </div>
  );
}


