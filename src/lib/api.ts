// lib/api.ts
import ky from "ky";
export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE!,
  hooks: {
    beforeRequest: [
      (req) => {
        if (typeof window === "undefined") return;
        const t = localStorage.getItem("litbuddyToken");
        if (t) req.headers.set("authorization", `Bearer ${t}`);
      },
    ],
  },
});
