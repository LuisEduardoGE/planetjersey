import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lightweight client-side check; real validation happens server-side.
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setStatus(valid ? "ok" : "error");
  };

  return (
    <section className="newsletter">
      <div className="newsletter__inner">
        <h2>Get first access to new drops</h2>
        <p>Join the list for early access, restocks, and members-only deals.</p>
        {status === "ok" ? (
          <p className="newsletter__ok">You're in. Check your inbox to confirm. ✓</p>
        ) : (
          <form className="newsletter__form" onSubmit={submit}>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-label="Email address"
              aria-invalid={status === "error"}
            />
            <button className="btn btn--primary" type="submit">
              Subscribe
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="newsletter__err">Please enter a valid email address.</p>
        )}
        <p className="newsletter__fine">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
