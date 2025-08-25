/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import ProviderButtons from "@/components/auth/ProviderButtons";
import { api } from "../../../lib/api";
import { useRouter } from "next/navigation";

export default function TeacherAuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function credentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api
        .post("auth/credentials/login", { json: { email, password } })
        .json<{ token: string }>();
      localStorage.setItem("litbuddyToken", res.token);
      router.push("/onboarding");
    } catch (err: any) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <p className="text-sm text-slate-600">
          Sign in to continue your reading journey
        </p>
      </div>

      <ProviderButtons />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 px-2 text-slate-500">or</span>
        </div>
      </div>

      <form onSubmit={credentialsLogin} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <button
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold shadow"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
