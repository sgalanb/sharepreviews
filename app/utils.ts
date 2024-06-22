import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
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

export const isValidUrl = (url: string | undefined) => {
  if (!url) return false
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

export const getUrlFromStringWithoutWWW = (str: string) => {
  if (isValidUrl(str)) {
    return new URL(str).toString().replace(/^https?:\/\/(www\.)?/, 'https://')
  }
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`)
        .toString()
        .replace(/^https?:\/\/(www\.)?/, 'https://')
    }
  } catch (e) {
    return null
  }
}

export const getUrlFromStringWithoutWWWOrProtocol = (str: string) => {
  if (isValidUrl(str)) {
    return new URL(str).toString().replace(/^https?:\/\/(www\.)?/, '')
  }
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`)
        .toString()
        .replace(/^https?:\/\/(www\.)?/, '')
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
    // otherwise, it's a subdomain (e.g. sharepreviews.vercel.app), so we return the last 2 parts
    return parts.slice(-2).join('.')
  }
  // if it's a normal domain, we return the domain
  return domain
}

export async function isImageValidServer(url: string) {
  try {
    const res = await fetch(url)
    const buff = await res.blob()

    return buff.type.startsWith('image/')
  } catch (e) {
    return false
  }
}

// client side only
export async function isImageValid(url: string) {
  try {
    const image = new Image()
    image.src = url
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
    })
    return true
  } catch (e) {
    return false
  }
}

// client side only
export async function getImageSizeFromUrl(url: string) {
  try {
    const image = new Image()
    image.src = url
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
    })
    return { width: image.width, height: image.height }
  } catch (e) {
    throw new Error('Error getting image size')
  }
}

// Templates
export const getConditionalValueVariableName = (layer: LayerType) => {
  const formattedLayerName = layer.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase()
  const postfix = layer.type === 'text' ? 'value' : 'src'
  return `${formattedLayerName}_${postfix}`
}

export const getConditionalVisibilityVariableName = (layer: LayerType) => {
  const formattedLayerName = layer.name
    .replace(/[^a-zA-Z0-9]/g, '_')
    .toLowerCase()
  return `${formattedLayerName}_isVisible`
}

const getConditionalValueVariables = (layers: LayerType[]) => {
  return layers
    .filter(
      (layer) =>
        (layer.type === 'text' || layer.type === 'image') &&
        layer.conditionalValue === true
    )
    .map(
      (layer) =>
        (layer.type === 'text' || layer.type === 'image') &&
        layer?.conditionalValueVariableName
    )
}
const getConditionalVisibilityVariables = (layers: LayerType[]) => {
  return layers
    .filter((layer) => layer.conditionalVisibility === true)
    .map((layer) => layer.conditionalVisibilityVariableName)
}
const getVariablesArray = (layers: LayerType[]) => {
  return [
    ...getConditionalVisibilityVariables(layers),
    ...getConditionalValueVariables(layers),
  ]
}

export function convertOpacityToHex(opacity: number) {
  // Convert decimal opacity to a 0-255 range, then to a hex string
  const hexOpacity = Math.floor(opacity * 255).toString(16)
  // Ensure single digits are preceded by a 0
  return hexOpacity.padStart(2, '0')
}

export function randomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}
