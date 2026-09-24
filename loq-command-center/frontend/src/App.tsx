import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { LoginGate } from "./components/LoginGate";
import { Sparkline } from "./components/Sparkline";
import { useTelemetry } from "./hooks/useTelemetry";

type Tab = "home" | "gpu" | "services" | "docker" | "projects" | "events" | "logs";

function formatUptime(sec: number | undefined) {
  if (!sec) return "—";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}h ${m}m`;
}

function gpuLabel(state: string) {
  switch (state) {
    case "working":
      return "WORKING";
    case "light":
      return "LIGHT LOAD";
    case "idle":
      return "IDLE";
    default:
      return "NO GPU DATA";
  }
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [overview, setOverview] = useState<any>(null);
  const [history, setHistory] = useState<any>(null);
  const [dockerDetail, setDockerDetail] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [actionMsg, setActionMsg] = useState("");
  const live = useTelemetry(authed);

  const refresh = useCallback(async () => {
    const [ov, telem, proj, ev] = await Promise.all([
      api.overview(),
      api.telemetry(),
      api.projects(),
      api.events(),
    ]);
    setOverview(ov);
    setHistory(telem.history);
    setProjects(proj);
    setEvents(ev);
  }, []);

  useEffect(() => {
    api.authStatus().then((s) => {
      if (!s.auth_required) {
        setAuthed(true);
        return;
      }
      setNeedsSetup(!s.password_configured);
      if (s.password_configured) {
        api.overview().then(() => setAuthed(true)).catch(() => setAuthed(false));
      }
    });
  }, []);

  useEffect(() => {
    if (!authed) return;
    refresh();
    const t = setInterval(refresh, 15000);
    return () => clearInterval(t);
  }, [authed, refresh]);

  useEffect(() => {
    if (tab === "docker" && authed) api.docker().then(setDockerDetail);
    if (tab === "logs" && authed) api.appLogs().then((r) => setLogs(r.lines));
  }, [tab, authed]);

  const telem = live || overview?.telemetry;
  const summary = overview?.machine?.summary;
  const system = overview?.machine?.system;
  const gpuDev = telem?.gpu?.devices?.[0];

  const gpuHist = history?.gpu || [];

  async function dockerAction(action: string, id: string, name: string) {
    if (!confirm(`Confirm ${action} container ${name}?`)) return;
    setActionMsg("");
    try {
      const r = await api.executeAction({
        action_id: `docker:container:${action}`,
        confirmed: true,
        container_id: id,
      });
      setActionMsg(r.ok ? `Container ${name} ${action}ed` : r.error || "Failed");
      setDockerDetail(await api.docker());
    } catch (e) {
      setActionMsg(e instanceof Error ? e.message : "Failed");
    }
  }

  const alerts = summary?.alerts || [];

  const nav: { id: Tab; label: string }[] = useMemo(
    () => [
      { id: "home", label: "Command" },
      { id: "gpu", label: "GPU" },
      { id: "services", label: "Services" },
      { id: "docker", label: "Docker" },
      { id: "projects", label: "Projects" },
      { id: "events", label: "Activity" },
      { id: "logs", label: "Logs" },
    ],
    []
  );

  if (!authed) {
    return <LoginGate needsSetup={needsSetup} onDone={() => { setAuthed(true); refresh(); }} />;
  }

  return (
    <div className="app">
      <header className="top-bar">
        <div className="brand">
          <span className="pulse online" />
          <div>
            <strong>{overview?.machine?.display_name || "LOQ"}</strong>
            <span className="host">{system?.hostname}</span>
          </div>
        </div>
        <div className="status-strip">
          <div className={`chip state-${summary?.gpu_state || "unknown"}`}>{gpuLabel(summary?.gpu_state)}</div>
          <div className="chip">CPU {Math.round(telem?.cpu_percent ?? 0)}%</div>
          <div className="chip">RAM {Math.round(telem?.memory_percent ?? 0)}%</div>
          <div className="chip mono">↑ {formatUptime(summary?.uptime_sec)}</div>
        </div>
        <button className="ghost" onClick={() => api.logout().then(() => setAuthed(false))}>Logout</button>
      </header>

      {alerts.length > 0 && (
        <div className="alert-rail">
          {alerts.map((a: any) => (
            <div key={a.code} className={`alert ${a.level}`}>{a.message}</div>
          ))}
        </div>
      )}

      <nav className="nav">
        {nav.map((n) => (
          <button key={n.id} className={tab === n.id ? "active" : ""} onClick={() => setTab(n.id)}>
            {n.label}
          </button>
        ))}
      </nav>

      <main className="main">
        {tab === "home" && (
          <div className="grid-home">
            <section className="panel hero-gpu">
              <header>
                <h2>GPU</h2>
                <span className="tag">{gpuLabel(summary?.gpu_state)}</span>
              </header>
              {gpuDev ? (
                <>
                  <p className="device-name">{gpuDev.name}</p>
                  <div className="meter-row">
                    <label>Utilization</label>
                    <div className="meter"><div style={{ width: `${gpuDev.utilization_gpu}%` }} /></div>
                    <span className="mono">{gpuDev.utilization_gpu}%</span>
                  </div>
                  <div className="meter-row">
                    <label>VRAM</label>
                    <div className="meter vram"><div style={{ width: `${(gpuDev.memory_used_mb / gpuDev.memory_total_mb) * 100}%` }} /></div>
                    <span className="mono">{gpuDev.memory_used_mb}/{gpuDev.memory_total_mb} MB</span>
                  </div>
                  <div className="stat-line">
                    <span>{gpuDev.temperature_c != null ? `${gpuDev.temperature_c}°C` : "—"}</span>
                    <span>{gpuDev.power_w != null ? `${gpuDev.power_w} W` : ""}</span>
                  </div>
                  <Sparkline data={gpuHist} width={280} height={48} />
                </>
              ) : (
                <p className="muted">{telem?.gpu?.error || "NVIDIA telemetry not available on this host."}</p>
              )}
            </section>

            <section className="panel">
              <h2>System</h2>
              <div className="kv">
                <span>Platform</span><span>{system?.platform} {system?.platform_release}</span>
                <span>CPU</span><span>{system?.processor || system?.cpu_count_logical + " threads"}</span>
                <span>RAM</span><span>{system?.memory?.used_gb} / {system?.memory?.total_gb} GB</span>
                <span>Boot</span><span className="mono small">{system?.boot_time_iso?.slice(0, 19)}</span>
              </div>
              <div className="spark-row">
                <div><span>CPU</span><Sparkline data={history?.cpu || []} /></div>
                <div><span>RAM</span><Sparkline data={history?.ram || []} stroke="var(--cool)" /></div>
              </div>
            </section>

            <section className="panel">
              <h2>Active services</h2>
              <ul className="service-list compact">
                {(overview?.services || []).slice(0, 8).map((s: any) => (
                  <li key={s.port}>
                    <span className="dot" data-status={s.status} />
                    <span>{s.name}</span>
                    <span className="mono">:{s.port}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="panel">
              <h2>Integrations</h2>
              <div className="kv">
                <span>Docker</span><span>{overview?.docker?.available ? `running (${overview.docker.containers_running} containers)` : overview?.docker?.error || "offline"}</span>
                <span>Ollama</span><span>{overview?.ollama?.available ? `${overview.ollama.models?.length || 0} models` : overview?.ollama?.error || "offline"}</span>
                <span>Projects</span><span>{overview?.projects_count}</span>
              </div>
            </section>

            <section className="panel wide">
              <h2>Recent activity</h2>
              <ul className="timeline">
                {(overview?.events || []).map((e: any) => (
                  <li key={e.id}>
                    <time>{new Date(e.ts * 1000).toLocaleString()}</time>
                    <span className={`lvl ${e.level}`}>{e.category}</span>
                    <span>{e.message}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}

        {tab === "gpu" && (
          <section className="panel gpu-page">
            <h2>GPU detail</h2>
            {gpuDev ? (
              <div className="gpu-grid">
                <div className="gpu-stat big">{gpuDev.utilization_gpu}%<small>util</small></div>
                <div className="gpu-stat">{gpuDev.memory_used_mb}<small>MB VRAM used</small></div>
                <div className="gpu-stat">{gpuDev.temperature_c ?? "—"}<small>°C</small></div>
                <div className="gpu-stat">{telem?.gpu?.driver_version || gpuDev.driver_version}<small>driver</small></div>
                <div className="full">
                  <h3>Processes</h3>
                  {gpuDev.processes?.length ? (
                    <table>
                      <thead><tr><th>PID</th><th>Name</th><th>VRAM MB</th></tr></thead>
                      <tbody>
                        {gpuDev.processes.map((p: any) => (
                          <tr key={p.pid}><td>{p.pid}</td><td>{p.name}</td><td>{p.used_memory_mb ?? "—"}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="muted">No GPU processes reported.</p>
                  )}
                </div>
                <div className="full">
                  <h3>Utilization history</h3>
                  <Sparkline data={gpuHist} width={480} height={80} />
                </div>
              </div>
            ) : (
              <p className="muted">NVML data unavailable.</p>
            )}
          </section>
        )}

        {tab === "services" && (
          <section className="panel">
            <h2>Listening services</h2>
            <table className="data-table">
              <thead>
                <tr><th>Status</th><th>Name</th><th>Port</th><th>Process</th><th>Health</th><th>URL</th></tr>
              </thead>
              <tbody>
                {(overview?.services || []).map((s: any) => (
                  <tr key={s.port}>
                    <td><span className="dot" data-status={s.status} /></td>
                    <td>{s.name}{s.pinned ? " ★" : ""}</td>
                    <td className="mono">{s.port}</td>
                    <td>{s.process || "—"}</td>
                    <td>{s.health || "—"}</td>
                    <td><a href={s.local_url} target="_blank" rel="noreferrer">{s.local_url}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {tab === "docker" && (
          <section className="panel">
            <h2>Docker</h2>
            {actionMsg && <p className="action-msg">{actionMsg}</p>}
            {!dockerDetail?.status?.available ? (
              <p className="muted">{dockerDetail?.status?.error || "Docker not available"}</p>
            ) : (
              <table className="data-table">
                <thead>
                  <tr><th>Name</th><th>Image</th><th>State</th><th>Ports</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {(dockerDetail?.containers || []).map((c: any) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td className="small">{c.image}</td>
                      <td>{c.status}</td>
                      <td className="mono small">{c.ports?.join(", ")}</td>
                      <td className="actions">
                        <button onClick={() => dockerAction("start", c.id, c.name)}>Start</button>
                        <button onClick={() => dockerAction("stop", c.id, c.name)}>Stop</button>
                        <button onClick={() => dockerAction("restart", c.id, c.name)}>Restart</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}

        {tab === "projects" && (
          <section className="panel">
            <h2>Development projects</h2>
            <div className="project-grid">
              {projects.map((p) => (
                <article key={p.path} className="project-card">
                  <header>
                    <h3>{p.name}</h3>
                    {p.pinned && <span className="tag">pinned</span>}
                  </header>
                  <p className="mono path">{p.path}</p>
                  <p className="stacks">{p.stacks?.join(" · ")}</p>
                  {p.git?.branch && (
                    <p className="git">{p.git.branch}{p.git.dirty ? " • dirty" : " • clean"}</p>
                  )}
                  {p.readme_excerpt && <p className="excerpt">{p.readme_excerpt}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        {tab === "events" && (
          <section className="panel">
            <h2>Activity timeline</h2>
            <ul className="timeline full">
              {events.map((e) => (
                <li key={e.id}>
                  <time>{new Date(e.ts * 1000).toLocaleString()}</time>
                  <span className={`lvl ${e.level}`}>{e.level}</span>
                  <span className="mono">{e.code}</span>
                  <span>{e.message}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === "logs" && (
          <section className="panel">
            <h2>Application logs</h2>
            <pre className="log-view">{logs.join("\n")}</pre>
          </section>
        )}
      </main>
    </div>
  );
}
