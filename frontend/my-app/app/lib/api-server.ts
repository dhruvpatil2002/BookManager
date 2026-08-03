// lib/api-server.ts  (no "use client")
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL!;

async function authFetch(path: string, options?: RequestInit) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers,
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}