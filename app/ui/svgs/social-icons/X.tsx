export default function X({
  className,
  ...props
}: {
  className: string
  props?: React.SVGProps<SVGSVGElement>
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      {...props}
    >
      <path
        fill="#000"
        d="M28.468 20.325 45.953 0H41.81L26.628 17.648 14.502 0H.516l18.337 26.686L.516 48h4.143l16.033-18.637L33.498 48h13.986L28.467 20.325zm-5.675 6.597-1.858-2.658L6.152 3.12h6.364l11.93 17.065 1.858 2.658 15.507 22.18h-6.364l-12.654-18.1z"
      />
    </svg>
  )
}
