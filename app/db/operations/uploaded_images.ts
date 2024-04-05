import { db } from '@/app/db'
import { uploadedImages } from '@/app/db/schema'

export async function createUploadedImage({
  key,
  url,
  userId,
}: {
  key: string
  url: string
  userId: string
}) {
  return await db.insert(uploadedImages).values({
    key: key,
    url: url,
    userId: userId,
    updatedAt: new Date(),
  })
}
