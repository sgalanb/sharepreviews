import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
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

// Projects
type RedisProjectType = {
  id: string
  name: string
  pathname: string
  ownerUserId: string
  subscriptionData: {
    plan: string
    productId?: string
    variantId?: string
    suscriptionId?: string
    suscriptionItemId?: string
  }
}

export async function createOrUpdateProjectRedis({
  id,
  name,
  pathname,
  plan,
  ownerUserId,
}: {
  id: string
  name: string
  pathname: string
  plan: string
  ownerUserId: string
}) {
  await redis.json.set(`project:${id}`, '$', {
    name,
    pathname,
    ownerUserId,
    subscriptionData: {
      plan,
      productId: undefined,
      variantId: undefined,
      suscriptionId: undefined,
      suscriptionItemId: undefined,
    },
  })
  return true
}

export async function updateProjectSubscriptionRedis({
  projectId,
  plan,
  productId,
  variantId,
  suscriptionId,
  suscriptionItemId,
}: {
  projectId: string
  plan: string
  productId?: string
  variantId?: string
  suscriptionId?: string
  suscriptionItemId?: string
}) {
  await redis.json.set(`project:${projectId}`, '$.subscriptionData', {
    plan,
    productId,
    variantId,
    suscriptionId,
    suscriptionItemId,
  })
  return true
}

export async function getProjectRedis(projectId: string) {
  return (await redis.json.get(`project:${projectId}`)) as
    | RedisProjectType
    | undefined
}

export async function deleteProjectRedis(projectId: string) {
  await redis.del(`project:${projectId}`)
  return
}

// Templates
type TemplateInfoType = {
  projectId: string
  canvasBackgroundColor: string
}

export async function createOrUpdateTemplateRedis({
  templateId,
  projectId,
  layersData,
  canvasBackgroundColor,
}: {
  templateId: string
  projectId: string
  layersData: string
  canvasBackgroundColor: string
}) {
  await redis.json.set(`template:${templateId}:info`, '$', {
    projectId,
    canvasBackgroundColor,
  })
  await redis.json.set(`template:${templateId}`, '$', layersData)
  return true
}

export async function getTemplateRedis(templateId: string) {
  return (await redis.json.get(`template:${templateId}`)) as
    | LayerType[]
    | undefined
}

export async function getTemplateInfoRedis(templateId: string) {
  return (await redis.json.get(`template:${templateId}:info`)) as
    | TemplateInfoType
    | undefined
}

export async function deleteTemplateRedis(templateId: string) {
  await redis.del(`template:${templateId}`)
  await redis.del(`template:${templateId}:info`)
  return
}

export async function logTemplateUrlToListRedis(
  templateId: string,
  url: string
) {
  return await redis.lpush(`template:${templateId}:urls`, url)
}

export async function getTemplateUrlsRedis(templateId: string) {
  // get all urls in the list
  return await redis.lrange(`template:${templateId}:urls`, 0, -1)
}

// Usage
export async function logUserUsage(userId: string) {
  return await redis.zincrby('users-images-usage', 1, userId)
}

export async function getUserUsage(userId: string) {
  return await redis.zscore('users-images-usage', userId)
}

export async function logProjectUsage(projectId: string) {
  return await redis.zincrby('projects-images-usage', 1, projectId)
}

export async function getProjectUsage(projectId: string) {
  return await redis.zscore('projects-images-usage', projectId)
}

export async function getAllProjectsUsage() {
  return (await redis.zrange('projects-images-usage', 0, -1, {
    withScores: true,
  })) as (string | number)[] | undefined
}
