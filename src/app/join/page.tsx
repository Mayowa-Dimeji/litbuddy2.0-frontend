"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function JoinPage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function join(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api
        .post("join", { json: { code, pseudonym: name } })
        .json<{ token: string }>();
      localStorage.setItem("litbuddyToken", res.token);
      router.push("/home");
    } catch {
      setError("Invalid or expired code");
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Join your classroom</h1>
      <form onSubmit={join} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Join code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="ABCD1234"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Pseudonym</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="e.g., Falcon"
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold shadow">
          Join
        </button>
      </form>
    </div>
  );
}
