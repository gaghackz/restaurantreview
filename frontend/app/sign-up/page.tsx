"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { apiJson } from "@/lib/api";
export default function Page() {
  const r = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await apiJson("/api/auth/sign-up/email", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      r.push("/restaurants");
      r.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign up failed");
    }
  }
  return (
    <main className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Join the table</p>
        <h1>Make room for good finds.</h1>
        <p className="auth-intro">
          Create an account to keep track of the places and plates worth
          remembering.
        </p>
        <form onSubmit={submit} className="auth-form">
          <label>
            Name
            <input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
              minLength={8}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="button">
            Create account <span aria-hidden="true">↗</span>
          </button>
          {error && <p className="form-error">{error}</p>}
        </form>
        <p className="auth-footnote">
          Already have an account? <a href="/sign-in">Sign in</a>
        </p>
      </div>
    </main>
  );
}
