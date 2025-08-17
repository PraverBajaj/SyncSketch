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
        <source src="./preview.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}