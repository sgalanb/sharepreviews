import { recordMetatags } from '@/app/lib/upstash'
import { isValidUrl } from '@/utils'
import he from 'he'
import { internal_runWithWaitUntil as waitUntil } from 'next/dist/server/web/internal-edge-wait-until'
import { parse } from 'node-html-parser'

export const getHtml = async (url: string) => {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // timeout if it takes longer than 5 seconds
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'sharepreviews-bot/1.0',
      },
    })
    clearTimeout(timeoutId)
    return await response.text()
  } catch (error: any) {
    if (error?.name === 'AbortError') {
      // Handle fetch request abort (e.g., due to timeout)
      console.error('Fetch request aborted due to timeout.')
    } else {
      // Handle other fetch errors
      console.error('Fetch request failed:', error)
    }
    return null
  }
}

export const getHeadChildNodes = (html: string) => {
  const ast = parse(html) // parse the html into AST format with node-html-parser
  const metaTags = ast.querySelectorAll('meta').map(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href
    return {
      property,
      content: attributes.content,
    }
  })
  const title = ast.querySelector('title')?.innerText
  const linkTags = ast.querySelectorAll('link').map(({ attributes }) => {
    const { rel, href } = attributes
    return {
      rel,
      href,
    }
  })

  return { metaTags, title, linkTags }
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

export const getMetaTags = async (url: string) => {
  const html = await getHtml(url)
  if (!html) {
    return {
      title: url,
      description: 'No description',
      image: null,
    }
  }
  const { metaTags, title: titleTag, linkTags } = getHeadChildNodes(html)

  let object: {
    [key: string]: string
  } = {}

  for (let k in metaTags) {
    let { property, content } = metaTags[k]

    property && (object[property] = content && he.decode(content))
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m]

    rel && (object[rel] = href)
  }

  // Metatags to validate
  const validatedMetatags = {
    title: titleTag ?? '',
    description: object['description'] ?? '',
    'og-title': object['og:title'] ?? '',
    'og-description': object['og:description'] ?? '',
    'og-image': getRelativeUrl(url, object['og:image']) ?? '',
    'og-image-width': object['og:image:width'] ?? '',
    'og-image-height': object['og:image:height'] ?? '',
    'og-image-type': object['og:image:type'] ?? '',
    'og-url': object['og:url'] ?? '',
    'twitter-title': object['twitter:title'] ?? '',
    'twitter-description': object['twitter:description'] ?? '',
    'twitter-image': getRelativeUrl(url, object['twitter:image']) ?? '',
    'twitter-site': object['twitter:site'] ?? '',
  }

  waitUntil(async () => {
    await recordMetatags(url, false)
  })

  return validatedMetatags
}
