function LoadingBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-[1.5rem] bg-black/6 ${className}`} />;
}

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-4 py-24 text-[#111111] sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[90rem] gap-6">
        <section className="rounded-[2rem] border border-black/10 bg-white p-6 sm:p-8">
          <LoadingBlock className="h-4 w-28" />
          <LoadingBlock className="mt-5 h-14 max-w-3xl" />
          <LoadingBlock className="mt-4 h-6 max-w-2xl" />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-black/10 bg-white p-5">
            <LoadingBlock className="h-40 w-full" />
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-5">
            <LoadingBlock className="h-40 w-full" />
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-5">
            <LoadingBlock className="h-40 w-full" />
          </div>
        </section>
      </div>
    </main>
  );
}
