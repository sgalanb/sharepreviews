import PreviewValidator from '@/app/ui/preview-validator'

export default async function Home() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 p-4">
      <PreviewValidator inputOnly />
    </div>
  )
}
