"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiJson } from "@/lib/api";
export default function Page() {
  const [d, setD] = useState<any>();
  const [err, setErr] = useState("");
  useEffect(() => {
    apiJson("/api/auth/get-session")
      .then(setD)
      .catch((e) => setErr(e.message));
  }, []);
  if (err)
    return (
      <main style={{ padding: 24 }}>
        <h1>Dashboard</h1>
        <p>{err}</p>
        <Link href="/sign-in">Sign in</Link>
      </main>
    );
  if (!d) return <main style={{ padding: 24 }}>Loading...</main>;
  return (
    <main className="page-shell dashboard-page">
      <p className="eyebrow">Your table</p>
      <h1>Welcome, {d.user.name}</h1>
      <p className="page-intro">{d.user.email}</p>
      <div className="dashboard-links">
        <Link className="button" href="/restaurants">
          Explore restaurants <span aria-hidden="true">↗</span>
        </Link>
        <Link className="text-link" href="/change-password">
          Change password
        </Link>
        <Link className="text-link" href="/session">
          View session
        </Link>
      </div>
    </main>
  );
}
