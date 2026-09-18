import { useEffect, useState } from "react";
import { connectTelemetry } from "../api";

export function useTelemetry(enabled: boolean) {
  const [live, setLive] = useState<any>(null);

  useEffect(() => {
    if (!enabled) return;
    const ws = connectTelemetry((data) => setLive(data));
    return () => ws.close();
  }, [enabled]);

  return live;
}
