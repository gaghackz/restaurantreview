"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiJson } from "@/lib/api";
export default function Page() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRemember] = useState(true);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await apiJson("/api/auth/sign-in/email", {
        method: "POST",
        body: JSON.stringify({ email, password, rememberMe }),
      });
      r.push("/restaurants");
      r.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign in failed");
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Pull up a chair.</h1>
        <p className="auth-intro">
          Sign in to explore local tables and leave a note of your own.
        </p>
        <form onSubmit={submit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRemember(e.target.checked)}
            />{" "}
            Remember me
          </label>
          <button className="button">
            Sign in <span aria-hidden="true">↗</span>
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
        <p className="auth-footnote">
          <a href="/forgot-password">Forgot password?</a> · New here?{" "}
          <a href="/sign-up">Create an account</a>
        </p>
      </div>
    </main>
  );
}
