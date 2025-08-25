"use client";
import { signIn } from "next-auth/react";

export default function ProviderButtons() {
  return (
    <div className="grid gap-3">
      <button
        onClick={() => signIn("google")}
        className="w-full rounded-xl border py-3 font-medium hover:bg-slate-50"
      >
        <span className="mr-2">🔴</span> Continue with Google
      </button>
      <button
        onClick={() => signIn("azure-ad")}
        className="w-full rounded-xl border py-3 font-medium hover:bg-slate-50"
      >
        <span className="mr-2">🟦</span> Continue with Microsoft
      </button>
    </div>
  );
}
