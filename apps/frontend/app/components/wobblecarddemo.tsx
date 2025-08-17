import { WobbleCard } from "./wobble-card";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10 mt-20 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[200px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs ">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Real-time collaborative sketching, redefined
          </h2>
          <p className="mt-4 text-left text-base/6 text-neutral-200">
            Join artists, designers, and teams drawing together in sync across
            the globe with our blazing-fast live sketch environment.
          </p>
        </div>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Every stroke in sync
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          Whether you're brainstorming UI wireframes or sketching characters,
          all collaborators see changes in real-time.
        </p>
      </WobbleCard>

      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[200px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Try Sync Sketch now — designed for creators, built for teams.
          </h2>
          <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
            From design sprints to storyboarding, sketch, comment, and iterate —
            together, from anywhere.
          </p>
        </div>
      </WobbleCard>
    </div>
  );
}