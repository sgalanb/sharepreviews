export default function PictorialMark({
  className,
  ...props
}: {
  className: string
  props?: React.SVGProps<SVGSVGElement>
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 14.6"
      className={className}
      {...props}
    >
      <g>
        <path
          d="M23,14.6H3c-1.65,0-3-1.35-3-3V3C0,1.35,1.35,0,3,0h20c1.65,0,3,1.35,3,3v8.6c0,1.65-1.35,3-3,3ZM3,2c-.55,0-1,.45-1,1v8.6c0,.55.45,1,1,1h20c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1H3Z"
          strokeWidth="0"
        />
        <path
          d="M6.92,11.7h-3c-.55,0-1-.45-1-1s.45-1,1-1h3c.55,0,1,.45,1,1s-.45,1-1,1Z"
          strokeWidth="0"
        />
      </g>
    </svg>
  )
}
