export async function setBackendTokenCookie(token: string) {
  await fetch("/api/session/set", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ token }),
  });
}

export async function clearBackendTokenCookie() {
  await fetch("/api/session/set", { method: "DELETE" });
}
