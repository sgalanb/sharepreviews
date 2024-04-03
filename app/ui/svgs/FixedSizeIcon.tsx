export default function FixedSizeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={className}
    >
      <line x1="7" x2="17" y1="4" y2="4" />
      <line x1="12" x2="12" y1="4" y2="20" />
      <line x1="7" x2="17" y1="20" y2="20" />
    </svg>
  )
}
