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

import { WobbleCard } from "./components/wobble-card";
import { HoverBorderGradient } from "./components/hover-border-gradient";
import { useState, useEffect } from "react";
import React from "react";
import { cn } from "../lib/utils";
import { ColourfulText } from "./components/colourful-text";

import { TextGenerateEffect } from "./components/text-generate-effect";


export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

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
       <GridBackgroundDemo/>
    </div>
  );
}

export function GridBackgroundDemo() {
  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-start bg-white dark:bg-black">
      {/* Grid background */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />
      
      {/* Radial gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />

      {/* Foreground content */}
      <div className="relative z-10 mt-40 flex flex-col items-center space-y-10">
        <ColourfulTextDemo/>
        <TextGenerateEffectDemo/>
        <HoverBorderGradientDemo/>
        <VideoDemo/>
        <WobbleCardDemo/>
        <Footer/>
      </div>
    </div>
  );
}



export function ColourfulTextDemo() {
  return (
    <div className="h-auto w-full flex items-start justify-center bg-transparent">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-10 font-sans">
        Online <ColourfulText text="Drawing Board" /> <br /> Made Simple
      </h1>
    </div>
  );
}




const words = `Sketch Together, Think Better with SyncSketch`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}



export function HoverBorderGradientDemo() {
  return (
    <div className=" flex justify-center text-center">
      <Link href="/signin">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
      >
        <PenIcon />
        <span>Start Drawing</span>
        
      </HoverBorderGradient>
      </Link>
    
    </div>
  );
}

const PenIcon = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-black dark:text-white"
    >
      <path
        d="M12.3 6.1L17.9 11.7L7.6 22H2V16.4L12.3 6.1ZM20.7 3.4C21.1 3.8 21.1 4.4 20.7 4.8L18.6 6.9L15.1 3.4L17.2 1.3C17.6 0.9 18.2 0.9 18.6 1.3L20.7 3.4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export function VideoDemo() {
  return (
    <div className="w-full max-w-5xl px-4">
      <video
        className="rounded-2xl shadow-xl w-full h-auto"
      
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="./preview.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}



export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Real-time collaborative sketching, redefined
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Join artists, designers, and teams drawing together in sync across the globe with our blazing-fast live sketch environment.
          </p>
        </div>
        <img
          src="/linear.webp"
          width={500}
          height={500}
          alt="collaborative sketch"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Every stroke in sync
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Whether you're brainstorming UI wireframes or sketching characters, all collaborators see changes in real-time.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Try Sync Sketch now — designed for creators, built for teams.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            From design sprints to storyboarding, sketch, comment, and iterate — together, from anywhere.
          </p>
        </div>
        <img
          src="/linear.webp"
          width={500}
          height={500}
          alt="sync sketch illustration"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}

import { Github, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full py-6 mt-16 border-t border-neutral-800 text-center text-sm text-neutral-400">
      <p>
        Made with <span className="text-red-500">❤️</span> by{" "}
        <span className="font-semibold text-white">Praver Bajaj</span>
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a
          href="https://github.com/praverbajaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://twitter.com/praver_bajaj"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <Twitter className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}

