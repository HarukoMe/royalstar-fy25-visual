const API = import.meta.env.DEV ? "" : "";

export type AuthStatus = { auth_required: boolean; password_configured: boolean };

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${API}${path}`, {
    credentials: "include",
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({ error: r.statusText }));
    throw new Error(err.error || err.detail || "Request failed");
  }
  return r.json() as Promise<T>;
}

export const api = {
  health: () => req<{ ok: boolean }>("/api/health"),
  authStatus: () => req<AuthStatus>("/api/auth/status"),
  setup: (password: string) =>
    req<{ ok: boolean }>("/api/auth/setup", { method: "POST", body: JSON.stringify({ password }) }),
  login: (password: string) =>
    req<{ ok: boolean }>("/api/auth/login", { method: "POST", body: JSON.stringify({ password }) }),
  logout: () => req<{ ok: boolean }>("/api/auth/logout", { method: "POST" }),
  overview: () => req<any>("/api/overview"),
  telemetry: () => req<any>("/api/telemetry"),
  gpu: () => req<any>("/api/gpu"),
  services: () => req<any[]>("/api/services"),
  docker: () => req<any>("/api/docker"),
  dockerLogs: (id: string) => req<any>(`/api/docker/${encodeURIComponent(id)}/logs`),
  ollama: () => req<any>("/api/ollama"),
  projects: () => req<any[]>("/api/projects"),
  events: () => req<any[]>("/api/events"),
  actions: () => req<any[]>("/api/actions"),
  executeAction: (body: { action_id: string; confirmed: boolean; container_id?: string }) =>
    req<any>("/api/actions/execute", { method: "POST", body: JSON.stringify(body) }),
  appLogs: () => req<{ lines: string[] }>("/api/logs/app"),
};

export function connectTelemetry(onMsg: (data: any) => void): WebSocket {
  const proto = window.location.protocol === "https:" ? "wss" : "ws";
  const host = import.meta.env.DEV ? "127.0.0.1:8742" : window.location.host;
  const ws = new WebSocket(`${proto}://${host}/ws/telemetry`);
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.type === "telemetry") onMsg(msg.data);
  };
  return ws;
}
