export default function LinkedIn({
  className,
  fillClassName,
  color = '#0a66c2',
  ...props
}: {
  className: string
  fillClassName?: string
  color?: string
  props?: React.SVGProps<SVGSVGElement>
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={className}
      {...props}
    >
      <g fillRule="evenodd" strokeWidth=".084">
        <path
          d="M44.522 0H3.617C1.661 0 0 1.547 0 3.454v41.09C0 46.452 1.09 48 3.046 48H43.95c1.959 0 4.048-1.548 4.048-3.456V3.454A3.441 3.441 0 0 0 44.522 0"
          fill="transparent"
        />
        <path
          fill={fillClassName ? '' : color}
          className={fillClassName}
          d="M44.522 0H3.617C1.661 0 0 1.547 0 3.454v41.09C0 46.452 1.09 48 3.046 48H43.95c1.959 0 4.048-1.548 4.048-3.456V3.454A3.441 3.441 0 0 0 44.522 0zM18.285 18.286h6.461v3.293h.071c.985-1.776 3.895-3.58 7.493-3.58 6.905 0 8.832 3.667 8.832 10.458v12.686h-6.857V29.707c0-3.04-1.214-5.707-4.053-5.707-3.447 0-5.09 2.334-5.09 6.164v10.979h-6.857zM6.856 41.143h6.857V18.286H6.856zm7.714-30.857a4.285 4.285 0 1 1-8.569.002 4.285 4.285 0 0 1 8.57-.002z"
        />
      </g>
    </svg>
  )
}
