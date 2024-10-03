export default function Home() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className="fixed left-0 top-0 h-full w-full object-cover blur-[3px] filter"
        src="/example-background-video.mp4"
      />
      <section className="relative z-10 flex h-full flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-4 rounded-none bg-blue-800 p-8">
          <h1 className="text-8xl font-bold">
            <span className="text-red-600">V</span>
            <span className="text-yellow-500">G</span>
            <span className="text-cyan-500">D</span>
            <span className="text-teal-500">C</span>
          </h1>
          <span className="text-lg">Video Game Development Club</span>
        </div>
      </section>
    </>
  );
}
