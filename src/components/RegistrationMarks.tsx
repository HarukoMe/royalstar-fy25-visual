/** Print-atelier registration marks. Replaces the previous bathymetric field. */
export function RegistrationMarks() {
  return (
    <svg className="regmarks" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g fill="none" stroke="currentColor" strokeWidth="0.12">
        <line x1="4" y1="0" x2="4" y2="100" />
        <line x1="96" y1="0" x2="96" y2="100" />
        <line x1="0" y1="6" x2="100" y2="6" />
        <line x1="0" y1="94" x2="100" y2="94" />
        <circle cx="4" cy="6" r="1.1" />
        <circle cx="96" cy="6" r="1.1" />
        <circle cx="4" cy="94" r="1.1" />
        <circle cx="96" cy="94" r="1.1" />
      </g>
    </svg>
  );
}
