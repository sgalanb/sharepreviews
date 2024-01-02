import {
  SECOND_LEVEL_DOMAINS,
  SPECIAL_APEX_DOMAINS,
  ccTLDs,
} from '@/app/constants'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// cn helper to make it easier to conditionally add Tailwind CSS classes (used by shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Standard fetcher for SWR
interface SWRError extends Error {
  status: number
}
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const error = await res.text()
    const err = new Error(error) as SWRError
    err.status = res.status
    throw err
  }

  return res.json()
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) return new URL(str).toString()
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (e) {
    return null
  }
}

export const getDomainWithoutWWW = (url: string) => {
  if (isValidUrl(url)) {
    return new URL(url).hostname.replace(/^www\./, '')
  }
  try {
    if (url.includes('.') && !url.includes(' ')) {
      return new URL(`https://${url}`).hostname.replace(/^www\./, '')
    }
  } catch (e) {
    return null
  }
}

export const getRelativeUrl = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl
  }
  const { protocol, host } = new URL(url)
  const baseURL = `${protocol}//${host}`
  return new URL(imageUrl, baseURL).toString()
}

export const getApexDomain = (url: string) => {
  let domain
  try {
    // replace any custom scheme (e.g. notion://) with https://
    // use the URL constructor to get the hostname
    domain = new URL(url.replace(/^[a-zA-Z]+:\/\//, 'https://')).hostname
  } catch (e) {
    return ''
  }
  if (domain === 'youtu.be') return 'youtube.com'
  if (domain === 'raw.githubusercontent.com') return 'github.com'
  if (domain.endsWith('.vercel.app')) return 'vercel.app'

  const parts = domain.split('.')
  if (parts.length > 2) {
    if (
      // if this is a second-level TLD (e.g. co.uk, .com.ua, .org.tt), we need to return the last 3 parts
      (SECOND_LEVEL_DOMAINS.has(parts[parts.length - 2]) &&
        ccTLDs.has(parts[parts.length - 1])) ||
      // if it's a special subdomain for website builders (e.g. weathergpt.vercel.app/)
      SPECIAL_APEX_DOMAINS.has(parts.slice(-2).join('.'))
    ) {
      return parts.slice(-3).join('.')
    }
    // otherwise, it's a subdomain (e.g. dub.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.')
  }
  // if it's a normal domain (e.g. dub.co), we return the domain
  return domain
}
