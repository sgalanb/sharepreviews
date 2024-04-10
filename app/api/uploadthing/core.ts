import { getUser } from '@/app/lib/workos'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    'image/jpeg': { maxFileSize: '4MB', maxFileCount: 1 },
    'image/png': { maxFileSize: '4MB', maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const auth = await getUser()

      // If you throw, the user will not be able to upload
      if (!auth.user || !auth.isAuthenticated) {
        throw new UploadThingError('Unauthorized')
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: auth.user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code runs on your server after upload

      // Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
