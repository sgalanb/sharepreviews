import { logUsageRecordIncrementAction } from '@/app/actions/lemonActions'
import { incrementProjectImagesCreated } from '@/app/db/operations/projects'
import {
  getAllProjectsUsage,
  getProjectRedis,
  resetProjectsUsage,
} from '@/app/lib/upstash'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // Only allow Vercel to access this endpoint
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response(`Not authorized.`, {
      status: 500,
    })
  }

  try {
    const projectsUsage = await getAllProjectsUsage()
    const formattedProjectsUsage = formatProjectUsage(projectsUsage ?? [])

    await Promise.all(
      formattedProjectsUsage.map(async (project) => {
        try {
          // Log Postgres
          await incrementProjectImagesCreated({
            projectId: project.id,
            quantity: project.quantity,
          })

          // Log Lemon Squeezy
          const projectData = await getProjectRedis(project.id)
          if (projectData?.subscriptionData?.suscriptionItemId) {
            await logUsageRecordIncrementAction({
              subscriptionItemId:
                projectData.subscriptionData.suscriptionItemId,
              quantity: project.quantity,
            })
          }
        } catch (error) {
          console.error(
            `Error processing usage of project ${project.id}:`,
            error
          )
        }
      })
    ).then(() => {
      // Reset Redis
      resetProjectsUsage()
    })

    return new Response('OK', { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

const formatProjectUsage = (
  array: (string | number)[]
): { id: string; quantity: number }[] => {
  const result: { id: string; quantity: number }[] = []

  for (let i = 0; i < array.length; i += 2) {
    const item = {
      id: array[i] as string,
      quantity: array[i + 1] as number,
    }
    result.push(item)
  }

  return result
}
