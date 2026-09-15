/** Fixed bathymetric field — structural, not decorative glow. */
export function Bathymetry() {
  return (
    <svg
      className="bathymetry"
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: 18 }, (_, i) => {
          const t = (i + 1) / 19;
          const rx = 120 + t * 720;
          const ry = 70 + t * 430;
          return (
            <ellipse
              key={i}
              cx="430"
              cy="390"
              rx={rx}
              ry={ry}
              opacity={0.07 + (1 - t) * 0.08}
            />
          );
        })}
      </g>
    </svg>
  );
}
