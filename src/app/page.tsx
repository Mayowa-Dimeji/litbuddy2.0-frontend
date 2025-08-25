import Link from "next/link";
import Image from "next/image";
import "./globals.css";

export default function LandingPage() {
  return (
    <div className="space-y-10 pb-20">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white text-2xl">
            👥👥
          </div>
        </div>
        <h1 className="text-2xl font-bold">Your Reading Buddy</h1>
        <p className="text-slate-600 max-w-sm mx-auto">
          Make reading fun and collaborative with games, personalized
          recommendations, and team challenges!
        </p>
        <Image
          src="/litbuddies.png"
          alt="Kids reading together"
          width={400} // set a size (Next.js requires this)
          height={300}
          className="mx-auto rounded-2xl"
          priority
        />
      </section>

      {/* Features */}
      <section className="space-y-4">
        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <h3 className="font-semibold">🎮 Reading Games</h3>
          <p className="text-sm text-slate-600">
            Interactive challenges that make reading exciting
          </p>
        </div>
        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <h3 className="font-semibold">✨ Smart Recommendations</h3>
          <p className="text-sm text-slate-600">
            Personalized book suggestions just for you
          </p>
        </div>
        <div className="rounded-2xl bg-white border p-4 shadow-sm">
          <h3 className="font-semibold">🤝 Team Challenges</h3>
          <p className="text-sm text-slate-600">
            Collaborate with friends and classmates
          </p>
        </div>
      </section>

      {/* Actions */}
      <section className="space-y-3">
        <Link
          href="/auth/teacher"
          className="block w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold text-center shadow"
        >
          🔑 Teacher Login
        </Link>
        <Link
          href="/join"
          className="block w-full rounded-xl border py-3 font-semibold text-center"
        >
          👩‍🎓 Student Join
        </Link>
        <Link
          href="/auth/teacher?tab=register"
          className="block w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold text-center shadow"
        >
          📚 Explore as Teacher
        </Link>
      </section>

      {/* Trust + footer */}
      <section className="text-center text-sm text-slate-600 space-y-2">
        <p className="font-semibold">🔒 Safe & Secure</p>
        <p>Age-appropriate content with full privacy protection</p>
        <Link href="/privacy" className="text-indigo-600 underline">
          View Privacy Policy
        </Link>
      </section>

      <footer className="border-t pt-6 text-center text-xs text-slate-500 space-y-1">
        <p>Trusted by Schools</p>
        <p>© 2024 LitBuddy. Making reading fun for everyone.</p>
        <div className="flex justify-center gap-4">
          <Link href="/contact">Contact</Link>
          <Link href="/legal">Legal</Link>
          <Link href="/support">Support</Link>
        </div>
      </footer>
    </div>
  );
}
