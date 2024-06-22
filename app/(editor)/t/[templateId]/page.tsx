import VisualEditor from '@/app/(editor)/t/[templateId]/visual-editor'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  return {
    title: `  | SharePreviews`,
  }
}

type Props = {
  params: { project: string; templateId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function EditTemplate({ params, searchParams }: Props) {
  return (
    <div className="h-full w-full">
      <VisualEditor templateId={params.templateId} />
    </div>
  )
}
