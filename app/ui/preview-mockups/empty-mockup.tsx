import { X } from 'lucide-react'

export default function EmptyMockup() {
  return (
    <div className="flex aspect-[3/1] h-full w-full flex-col items-center justify-center gap-2">
      <X className="h-10 w-10" color="#EF4444" />
      <span className="text-balance text-center">
        Link won&apos;t have a preview. <br />
        Check metatags.
      </span>
    </div>
  )
}
