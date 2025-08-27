export type JwtLite = {
  sub?: string;
  role?: "teacher" | "student";
  onboarded?: boolean;
};

export function decodeJwtLite(token: string | null): JwtLite | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const json = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}
