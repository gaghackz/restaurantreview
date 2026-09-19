"use client";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiJson } from "@/lib/api";
function ResetForm() {
  const p = useSearchParams();
  const r = useRouter();
  const token = p.get("token") || "";
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      await apiJson("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ newPassword: pw, token }),
      });
      setDone(true);
      setTimeout(() => r.push("/sign-in"), 800);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Reset failed");
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">One last step</p>
        <h1>Set a new password.</h1>
        {done ? (
          <p className="form-success">Password reset. Redirecting...</p>
        ) : (
          <form onSubmit={submit} className="auth-form">
            <label>
              New password
              <input
                type="password"
                minLength={8}
                placeholder="At least 8 characters"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
              />
            </label>
            <button className="button">Reset password</button>
            {!token && <p className="form-error">Missing reset token.</p>}
            {err && <p className="form-error">{err}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="auth-page">
          <p className="loading-copy">Preparing your reset...</p>
        </main>
      }
    >
      <ResetForm />
    </Suspense>
  );
}
