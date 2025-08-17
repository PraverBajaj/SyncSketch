
import { cn } from "../../lib/utils";
import { ColourfulTextDemo } from "./colorfulltext";
import { Footer } from "./footer";
import { HoverBorderGradientDemo, TextGenerateEffectDemo } from "./TextGenerateEffectDemo";
import { VideoDemo } from "./videodemo";
import { WobbleCardDemo } from "./wobblecarddemo";


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
        <ColourfulTextDemo />
        <TextGenerateEffectDemo />
        <HoverBorderGradientDemo />
        <VideoDemo />
        <WobbleCardDemo/>
        <Footer />
      </div>
    </div>
  );
}