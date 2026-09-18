import { FormEvent, useState } from "react";
import { api } from "../api";

export function LoginGate({
  needsSetup,
  onDone,
}: {
  needsSetup: boolean;
  onDone: () => void;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (needsSetup) await api.setup(password);
      else await api.login(password);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-shell">
      <div className="login-panel">
        <p className="eyebrow">LOQ Command Center</p>
        <h1>{needsSetup ? "Create operator password" : "Authenticate"}</h1>
        <p className="muted">
          {needsSetup
            ? "This console controls your machine. Choose a strong password stored locally."
            : "Session is bound to this browser via HttpOnly cookie."}
        </p>
        <form onSubmit={submit}>
          <input
            type="password"
            autoComplete={needsSetup ? "new-password" : "current-password"}
            placeholder="Password (min 8 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={busy}>
            {needsSetup ? "Initialize" : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
