import { ColourfulText } from "./colourful-text";

export function ColourfulTextDemo() {
  return (
    <div className="h-auto w-full flex items-start justify-center bg-transparent">
      <h1 className="text-4xl md:text-5xl  lg:text-7xl font-bold text-center text-white relative z-10 font-sans">
        <div className="md:block hidden">
          Online <ColourfulText text="Drawing Board" /> <br /> Made Simple
        </div>
        <div className="md:hidden block text-4xl">
          Online <br /> <ColourfulText text="Drawing Board" /> <br /> Made
          Simple
        </div>
      </h1>
    </div>
  );
}