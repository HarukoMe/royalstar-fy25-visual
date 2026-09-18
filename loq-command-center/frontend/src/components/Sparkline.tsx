type Point = { t: number; v: number };

export function Sparkline({
  data,
  width = 120,
  height = 36,
  stroke = "var(--accent)",
}: {
  data: Point[];
  width?: number;
  height?: number;
  stroke?: string;
}) {
  if (!data.length) return <svg width={width} height={height} />;
  const vals = data.map((d) => d.v);
  const min = 0;
  const max = 100;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;
  const pts = vals
    .map((v, i) => {
      const x = pad + (i / Math.max(vals.length - 1, 1)) * w;
      const y = pad + h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} className="sparkline">
      <polyline fill="none" stroke={stroke} strokeWidth="1.5" points={pts} />
    </svg>
  );
}
