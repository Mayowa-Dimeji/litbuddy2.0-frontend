"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const ALL_TOPICS = [
  "Fantasy",
  "Sports",
  "Mystery",
  "Adventure",
  "Music",
  "Science",
] as const;
type Topic = (typeof ALL_TOPICS)[number];

export default function Onboarding() {
  const [sel, setSel] = useState<Topic[]>([]);
  const [lri, setLri] = useState(560);
  const [glossary, setGlossary] = useState(false);
  const [audio, setAudio] = useState(false);
  const [dyslexic, setDyslexic] = useState(false);
  const router = useRouter();

  const summary = useMemo(() => {
    const top = sel.slice(0, 2).join(" & ") || "Your picks";
    const band = lri < 450 ? "Grade 4-5" : lri < 650 ? "Grade 6-7" : "Grade 8+";
    return { top, band };
  }, [sel, lri]);

  function toggle(t: Topic) {
    setSel((curr) =>
      curr.includes(t) ? curr.filter((x) => x !== t) : [...curr, t]
    );
  }

  async function save() {
    // TODO: call backend route to persist (PATCH /me/preferences)
    localStorage.setItem(
      "lb.preferences",
      JSON.stringify({
        interests: sel,
        lriEstimate: lri,
        supports: { glossary, audio, dyslexic },
      })
    );
    router.push("/home");
  }

  return (
    <div className="space-y-6">
      <p className="text-xs text-slate-500">
        Step 1 of 3 • Personalize your buddy
      </p>
      <h1 className="text-2xl font-bold">What do you love reading about?</h1>

      <div className="grid grid-cols-2 gap-3">
        {ALL_TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => toggle(t)}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
              sel.includes(t) ? "bg-indigo-50 border-indigo-300" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2 mt-4">
        <p className="font-semibold">Reading comfort level</p>
        <input
          type="range"
          min={300}
          max={900}
          step={10}
          value={lri}
          onChange={(e) => setLri(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-sm text-slate-600">
          Target level: <span className="font-semibold">{summary.band}</span>
        </p>
      </div>

      <div className="space-y-3 mt-2">
        <p className="font-semibold">Learning supports</p>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={glossary}
            onChange={(e) => setGlossary(e.target.checked)}
          />{" "}
          Bilingual glossary
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={audio}
            onChange={(e) => setAudio(e.target.checked)}
          />{" "}
          Audio support
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={dyslexic}
            onChange={(e) => setDyslexic(e.target.checked)}
          />{" "}
          Dyslexia‑friendly font
        </label>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-pink-50 to-indigo-50 p-3 text-sm">
        You’ll see more of: <span className="font-semibold">{summary.top}</span>{" "}
        • <span className="font-semibold">{summary.band}</span> stories
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/home")}
          className="flex-1 rounded-xl border py-3"
        >
          Skip for now
        </button>
        <button
          onClick={save}
          className="flex-1 rounded-xl bg-indigo-600 text-white py-3 font-semibold"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
