import Link from "next/link"; // ✅ Correct import for navigation
import { HoverBorderGradient } from "./hover-border-gradient";
import { TextGenerateEffect } from "./text-generate-effect";
import { PenIcon } from "./penicon";

const words = `Sketch Together, Think Better with SyncSketch`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}

export function HoverBorderGradientDemo() {
  return (
    <div className="flex justify-center text-center">
      <Link href="/signin">
        {/* Link wraps a div, NOT a button */}
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="div" // ✅ Use "div", not "button" to avoid nested <button>
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
        >
          <PenIcon />
          <span>Start Drawing</span>
        </HoverBorderGradient>
      </Link>
    </div>
  );
}
