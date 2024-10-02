export default function Home() {
  return (
    <>
      <video
        className="fixed top-0 left-0 w-full h-full object-cover filter blur-[1px]"
        src="/example-background-video.mp4"
        autoPlay
        loop
        muted
      />
      <section className="z-10 h-full relative flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex flex-col items-center justify-center gap-4 bg-cyan-900 p-8 rounded-none">
          <h1 className="text-4xl font-bold">
            <span className="text-red-600">V</span>
            <span className="text-yellow-500">G</span>
            <span className="text-cyan-500">D</span>
            <span className="text-teal-500">C</span>
          </h1>
          <span className="text-lg">
            We are a community of gamers and developers
          </span>
        </div>
      </section>
    </>
  );
}
