import {
  validateDescriptionErrors,
  validateDescriptionWarnings,
  validateOgDescriptionErrors,
  validateOgDescriptionWarnings,
  validateOgImageErrors,
  validateOgImageHeightErrors,
  validateOgImageHeightWarnings,
  validateOgImageTypeErrors,
  validateOgImageTypeWarnings,
  validateOgImageWarnings,
  validateOgImageWidthErrors,
  validateOgImageWidthWarnings,
  validateOgSiteNameErrors,
  validateOgSiteNameWarnings,
  validateOgTitleErrors,
  validateOgTitleWarnings,
  validateOgTypeErrors,
  validateOgTypeWarnings,
  validateOgUrlErrors,
  validateOgUrlWarnings,
  validateTitleErrors,
  validateTitleWarnings,
  validateTwitterCardErrors,
  validateTwitterCardWarnings,
  validateTwitterCreatorErrors,
  validateTwitterCreatorWarnings,
  validateTwitterDescriptionErrors,
  validateTwitterDescriptionWarnings,
  validateTwitterImageErrors,
  validateTwitterImageHeightErrors,
  validateTwitterImageHeightWarnings,
  validateTwitterImageTypeErrors,
  validateTwitterImageTypeWarnings,
  validateTwitterImageWarnings,
  validateTwitterImageWidthErrors,
  validateTwitterImageWidthWarnings,
  validateTwitterSiteErrors,
  validateTwitterSiteWarnings,
  validateTwitterTitleErrors,
  validateTwitterTitleWarnings,
} from '@/app/api/metatags/validate/tag-validations'
import { recordMetatags } from '@/app/lib/upstash'
import { getRelativeUrl } from '@/app/utils'
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
  const metatags = ast.querySelectorAll('meta').map(({ attributes }) => {
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

  return { metatags, title, linkTags }
}

export type SortedMetatagsType = {
  title: string
  description: string
  'og:title': string
  'og:description': string
  'og:image': string
  'og:image:width': string
  'og:image:height': string
  'og:image:type': string
  'og:url': string
  'og:site_name': string
  'og:type': string
  'twitter:title': string
  'twitter:description': string
  'twitter:card': string
  'twitter:image': string
  'twitter:image:src': string
  'twitter:image:width': string
  'twitter:image:height': string
  'twitter:image:type': string
  'twitter:site': string
  'twitter:creator': string
}

export const getMetatags = async (url: string) => {
  const html = await getHtml(url)
  if (!html) {
    return {
      title: '',
      description: '',
      'og:title': '',
      'og:description': '',
      'og:image': '',
      'og:image:width': '',
      'og:image:height': '',
      'og:image:type': '',
      'og:url': '',
      'og:site_name': '',
      'og:type': '',
      'twitter:title': '',
      'twitter:description': '',
      'twitter:card': '',
      'twitter:image': '',
      'twitter:image:width': '',
      'twitter:image:height': '',
      'twitter:image:type': '',
      'twitter:site': '',
      'twitter:creator': '',
    }
  }

  const { metatags, title: titleTag, linkTags } = getHeadChildNodes(html)

  let object: {
    [key: string]: string
  } = {}

  for (let k in metatags) {
    let { property, content } = metatags[k]

    property && (object[property] = content && he.decode(content))
  }

  for (let m in linkTags) {
    let { rel, href } = linkTags[m]

    rel && (object[rel] = href)
  }

  const sortedMetatags: SortedMetatagsType = {
    title: titleTag ?? '',
    description: object['description'] ?? '',
    'og:title': object['og:title'] ?? '',
    'og:description': object['og:description'] ?? '',
    'og:image': getRelativeUrl(url, object['og:image']) ?? '',
    'og:image:width': object['og:image:width'] ?? '',
    'og:image:height': object['og:image:height'] ?? '',
    'og:image:type': object['og:image:type'] ?? '',
    'og:url': object['og:url'] ?? '',
    'og:site_name': object['og:site_name'] ?? '',
    'og:type': object['og:type'] ?? '',
    'twitter:title': object['twitter:title'] ?? '',
    'twitter:description': object['twitter:description'] ?? '',
    'twitter:card': object['twitter:card'] ?? '',
    'twitter:image': getRelativeUrl(url, object['twitter:image']) ?? '',
    'twitter:image:src': getRelativeUrl(url, object['twitter:image:src']) ?? '',
    'twitter:image:width': object['twitter:image:width'] ?? '',
    'twitter:image:height': object['twitter:image:height'] ?? '',
    'twitter:image:type': object['twitter:image:type'] ?? '',
    'twitter:site': object['twitter:site'] ?? '',
    'twitter:creator': object['twitter:creator'] ?? '',
  }

  waitUntil(async () => {
    await recordMetatags(url, false)
  })

  return sortedMetatags
}

export type ValidatedMetatagType = {
  value: string
  errors: string[]
  warnings: string[]
  info_url: string
}

export type ValidatedMetatagsType = {
  [key: string]: ValidatedMetatagType
}

export const getValidatedMetatags = async (url: string) => {
  const metatags = await getMetatags(url)
  const validatedMetatags: ValidatedMetatagsType = {
    title: {
      value: metatags.title,
      errors: validateTitleErrors(metatags.title),
      warnings: validateTitleWarnings(metatags.title),
      info_url: '/blog/everything-you-should-know-about-social-metatags#title',
    },
    description: {
      value: metatags.description,
      errors: validateDescriptionErrors(metatags.description),
      warnings: validateDescriptionWarnings(metatags.description),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#description',
    },
    'og:title': {
      value: metatags['og:title'],
      errors: validateOgTitleErrors(metatags['og:title']),
      warnings: validateOgTitleWarnings(metatags['og:title']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:title',
    },
    'og:description': {
      value: metatags['og:description'],
      errors: validateOgDescriptionErrors(metatags['og:description']),
      warnings: validateOgDescriptionWarnings(metatags['og:description']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:description',
    },
    'og:image': {
      value: metatags['og:image'],
      errors: await validateOgImageErrors(metatags['og:image']),
      warnings: await validateOgImageWarnings(metatags['og:image']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:image',
    },
    'og:image:width': {
      value: metatags['og:image:width'],
      errors: validateOgImageWidthErrors(metatags['og:image:width']),
      warnings: validateOgImageWidthWarnings(metatags['og:image:width']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:image:dimensions',
    },
    'og:image:height': {
      value: metatags['og:image:height'],
      errors: validateOgImageHeightErrors(metatags['og:image:height']),
      warnings: validateOgImageHeightWarnings(metatags['og:image:height']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:image:dimensions',
    },
    'og:image:type': {
      value: metatags['og:image:type'],
      errors: validateOgImageTypeErrors(metatags['og:image:type']),
      warnings: validateOgImageTypeWarnings(metatags['og:image:type']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:image:type',
    },
    'og:url': {
      value: metatags['og:url'],
      errors: validateOgUrlErrors(metatags['og:url']),
      warnings: validateOgUrlWarnings(metatags['og:url']),
      info_url: '/blog/everything-you-should-know-about-social-metatags#og:url',
    },
    'og:site_name': {
      value: metatags['og:site_name'],
      errors: validateOgSiteNameErrors(metatags['og:site_name']),
      warnings: validateOgSiteNameWarnings(metatags['og:site_name']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:site_name',
    },
    'og:type': {
      value: metatags['og:type'],
      errors: validateOgTypeErrors(metatags['og:type']),
      warnings: validateOgTypeWarnings(metatags['og:type']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#og:type',
    },
    'twitter:title': {
      value: metatags['twitter:title'],
      errors: validateTwitterTitleErrors(metatags['twitter:title']),
      warnings: validateTwitterTitleWarnings(metatags['twitter:title']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:title',
    },
    'twitter:description': {
      value: metatags['twitter:description'],
      errors: validateTwitterDescriptionErrors(metatags['twitter:description']),
      warnings: validateTwitterDescriptionWarnings(
        metatags['twitter:description']
      ),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:description',
    },
    'twitter:card': {
      value: metatags['twitter:card'],
      errors: validateTwitterCardErrors(metatags['twitter:card']),
      warnings: validateTwitterCardWarnings(metatags['twitter:card']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:card',
    },
    'twitter:image': {
      value: metatags['twitter:image'],
      errors: await validateTwitterImageErrors(metatags['twitter:image']),
      warnings: await validateTwitterImageWarnings(metatags['twitter:image']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:image',
    },
    'twitter:image:width': {
      value: metatags['twitter:image:width'],
      errors: validateTwitterImageWidthErrors(metatags['twitter:image:width']),
      warnings: validateTwitterImageWidthWarnings(
        metatags['twitter:image:width']
      ),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:image:dimensions',
    },
    'twitter:image:height': {
      value: metatags['twitter:image:height'],
      errors: validateTwitterImageHeightErrors(
        metatags['twitter:image:height']
      ),
      warnings: validateTwitterImageHeightWarnings(
        metatags['twitter:image:height']
      ),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:image:dimensions',
    },
    'twitter:image:type': {
      value: metatags['twitter:image:type'],
      errors: validateTwitterImageTypeErrors(metatags['twitter:image:type']),
      warnings: validateTwitterImageTypeWarnings(
        metatags['twitter:image:type']
      ),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:image:type',
    },
    'twitter:site': {
      value: metatags['twitter:site'],
      errors: validateTwitterSiteErrors(metatags['twitter:site']),
      warnings: validateTwitterSiteWarnings(metatags['twitter:site']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:site',
    },
    'twitter:creator': {
      value: metatags['twitter:creator'],
      errors: validateTwitterCreatorErrors(metatags['twitter:creator']),
      warnings: validateTwitterCreatorWarnings(metatags['twitter:creator']),
      info_url:
        '/blog/everything-you-should-know-about-social-metatags#twitter:creator',
    },
  }

  return validatedMetatags
}
