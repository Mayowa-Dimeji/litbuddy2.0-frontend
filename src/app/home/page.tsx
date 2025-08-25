export default function HomePage() {
  return (
    <div className="space-y-6 pb-24">
      <section className="rounded-2xl p-4 bg-violet-600 text-white shadow">
        <p className="text-lg font-semibold">Good morning! 📚</p>
        <p className="text-sm opacity-90">
          Ready to continue your reading adventure?
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Continue Reading</h2>
        <div className="rounded-2xl bg-white p-3 border flex gap-3 items-center">
          <div className="h-16 w-12 rounded bg-slate-200" />
          <div className="flex-1">
            <p className="font-medium">The Secret Garden</p>
            <div className="h-2 bg-slate-200 rounded mt-1">
              <div className="h-2 bg-emerald-500 rounded w-3/4" />
            </div>
            <button className="mt-2 rounded-xl bg-indigo-600 text-white px-3 py-1.5 text-sm">
              Resume Reading
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Team Quest</h2>
        <div className="rounded-2xl bg-white p-3 border">
          <p className="font-medium">Adventure Squad</p>
          <p className="text-sm text-slate-600">
            Reading challenge starts in 2 hours
          </p>
          <button className="mt-3 rounded-xl bg-amber-500 text-white px-3 py-2 font-semibold">
            Join Quest
          </button>
        </div>
      </section>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md border-t bg-white">
        <div className="grid grid-cols-5 text-center text-xs py-2">
          <span className="font-semibold">Home</span>
          <span>Library</span>
          <span>Games</span>
          <span>Progress</span>
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
}
