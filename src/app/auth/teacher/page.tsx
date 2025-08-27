/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { setBackendTokenCookie } from "@/lib/session";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProviderButtons from "@/components/auth/ProviderButtons";
import { api } from "@/lib/api";

type TabKey = "signin" | "register";

export default function TeacherAuthPage() {
  const router = useRouter();
  const qp = useSearchParams();
  const defaultTab = (
    qp.get("tab") === "register" ? "register" : "signin"
  ) as TabKey;

  const [tab, setTab] = useState<TabKey>(defaultTab);

  // shared
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // sign in
  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");

  // register
  const [schoolName, setSchoolName] = useState("LitBuddy Academy");
  const [displayName, setDisplayName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  useEffect(() => setTab(defaultTab), [defaultTab]);

  const registerDisabled = useMemo(() => {
    if (!regEmail || !regPassword || !displayName) return true;
    if (regPassword.length < 8) return true;
    if (regPassword !== regConfirm) return true;
    return false;
  }, [regEmail, regPassword, regConfirm, displayName]);

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api
        .post("auth/credentials/login", {
          json: { email: siEmail, password: siPassword },
        })
        .json<{ token: string }>();
      localStorage.setItem("litbuddyToken", res.token);
      await setBackendTokenCookie(res.token);
      router.push("/onboarding");
    } catch (err: any) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api
        .post("auth/credentials/register-teacher", {
          json: {
            schoolName,
            email: regEmail,
            password: regPassword,
            displayName,
          },
        })
        .json<{ token: string }>();
      // if backend returns 409 when email exists, we'll catch below
      localStorage.setItem("litbuddyToken", res.token);
      router.push("/teacher");
    } catch (err: any) {
      // try to read backend error if any
      setError(
        err?.response?.status === 409
          ? "Email already registered"
          : "Could not create account"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      {/* Tabs header */}
      <div className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b -mx-4 px-4">
        <div className="flex gap-6 h-12 items-end">
          <button
            className={`pb-2 text-sm font-medium ${
              tab === "signin"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500"
            }`}
            onClick={() => setTab("signin")}
          >
            Sign In
          </button>
          <button
            className={`pb-2 text-sm font-medium ${
              tab === "register"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-slate-500"
            }`}
            onClick={() => setTab("register")}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold">
            {tab === "signin" ? "Welcome back!" : "Create your teacher account"}
          </h1>
          <p className="text-sm text-slate-600">
            {tab === "signin"
              ? "Sign in to continue your reading journey"
              : "Set up your LitBuddy teacher profile"}
          </p>
        </div>

        {/* Providers */}
        <ProviderButtons />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-500">or with email</span>
          </div>
        </div>

        {/* Forms */}
        {tab === "signin" ? (
          <form onSubmit={onSignIn} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                value={siEmail}
                onChange={(e) => setSiEmail(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="teacher@school.ac"
                type="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={siPassword}
                onChange={(e) => setSiPassword(e.target.value)}
                className="mt-1 w-full rounded-xl border px-3 py-2"
                placeholder="Enter your password"
                required
              />
            </div>
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold shadow disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-center text-sm text-slate-600">
              New here?{" "}
              <button
                type="button"
                className="text-indigo-600 underline"
                onClick={() => setTab("register")}
              >
                Create an account
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={onRegister} className="space-y-3">
            <div className="grid gap-3">
              <div>
                <label className="block text-sm font-medium">School name</label>
                <input
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder="Your school"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Display name
                </label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder="Ms. Rivera"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder="teacher@school.ac"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder="At least 8 characters"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className="mt-1 w-full rounded-xl border px-3 py-2"
                  placeholder="Re-enter password"
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-rose-600">{error}</p>}
            <button className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold shadow disabled:opacity-50">
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <button
                type="button"
                className="text-indigo-600 underline"
                onClick={() => setTab("signin")}
              >
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
