import { getDomainWithoutWWW } from '@/app/utils'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initiate Redis instance by connecting to REST URL
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Create a new ratelimiter, that allows 10 requests per 10 seconds by default
export const ratelimit = (
  requests: number = 10,
  seconds:
    | `${number} ms`
    | `${number} s`
    | `${number} m`
    | `${number} h`
    | `${number} d` = '10 s'
) => {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, seconds),
    analytics: true,
    prefix: 'sharepreviews',
  })
}

//  Recording metatags that were generated via `/api/metatags/validate`
//  If there's an error, it will be logged to a separate redis list for debugging
export async function recordMetatags(url: string, error: boolean) {
  if (error) {
    return await redis.zincrby('metatags-error-zset', 1, url)
  }

  const domain = getDomainWithoutWWW(url)
  return await redis.zincrby('metatags-zset', 1, domain)
}

// export async function createTemplate({
//   templateId,
//   data,
// }: {
//   templateId: string
//   data: string
// }) {
//   return await redis.json.set(`template:${templateId}`, '$', data)
// }

// export async function getTemplate(templateId: string) {
//   return await redis.json.get(`template:${templateId}`)
// }
