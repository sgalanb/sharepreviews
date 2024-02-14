import { isImageValidServer } from '@/app/utils'

export const validateTitleErrors = (title: string | undefined): string[] => {
  const errors: string[] = []
  if (!title) {
    errors.push('Missing title.')
    return errors
  }
  return errors
}

export const validateTitleWarnings = (title: string | undefined): string[] => {
  const warnings: string[] = []
  if (!title) {
    return warnings
  }
  return warnings
}

export const validateDescriptionErrors = (
  description: string | undefined
): string[] => {
  const errors: string[] = []
  if (!description) {
    errors.push('Missing description.')
    return errors
  }
  return errors
}

export const validateDescriptionWarnings = (
  description: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!description) {
    return warnings
  }
  return warnings
}

export const validateOgTitleErrors = (
  ogTitle: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogTitle) {
    return errors
  }
  return errors
}

export const validateOgTitleWarnings = (
  ogTitle: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogTitle) {
    warnings.push('Missing og:title.')
    return warnings
  }
  return warnings
}

export const validateOgDescriptionErrors = (
  ogDescription: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogDescription) {
    return errors
  }
  return errors
}

export const validateOgDescriptionWarnings = (
  ogDescription: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogDescription) {
    warnings.push('Missing og:description.')
    return warnings
  }
  return warnings
}

export const validateOgImageErrors = async (
  ogImage: string | undefined
): Promise<string[]> => {
  const errors: string[] = []
  if (!ogImage) {
    errors.push('Missing og:image.')
    return errors
  }

  const isValidImage = await isImageValidServer(ogImage)
  if (!isValidImage) {
    errors.push("Couldn't load og:image. Check if URL is valid and accessible.")
  }
  return errors
}

export const validateOgImageWarnings = async (
  ogImage: string | undefined
): Promise<string[]> => {
  const warnings: string[] = []
  if (!ogImage) {
    return warnings
  }

  // const dimensions = await getImageSizeFromUrl(ogImage)
  // const aspectRatio = dimensions.width / dimensions.height
  // if (
  //   dimensions.width !== dimensions.height &&
  //   (aspectRatio < 1.8 || aspectRatio > 2)
  // ) {
  //   warnings.push(
  //     'og:image is recommended to have an aspect ratio close to 1.91:1 or 1:1 to avoid cropping.'
  //   )
  // }

  return warnings
}

export const validateOgImageWidthErrors = (
  ogImageWidth: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogImageWidth) {
    return errors
  }
  return errors
}

export const validateOgImageWidthWarnings = (
  ogImageWidth: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogImageWidth) {
    warnings.push('Missing og:image:width.')
    return warnings
  }
  return warnings
}

export const validateOgImageHeightErrors = (
  ogImageHeight: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogImageHeight) {
    return errors
  }
  return errors
}

export const validateOgImageHeightWarnings = (
  ogImageHeight: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogImageHeight) {
    warnings.push('Missing og:image:height.')
    return warnings
  }
  return warnings
}

export const validateOgImageTypeErrors = (
  ogImageType: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogImageType) {
    return errors
  }
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(ogImageType)) {
    errors.push('Invalid og:image:type.')
  }
  return errors
}

export const validateOgImageTypeWarnings = (
  ogImageType: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogImageType) {
    warnings.push('Missing og:image:type.')
    return warnings
  }
  return warnings
}

export const validateOgUrlErrors = (ogUrl: string | undefined): string[] => {
  const errors: string[] = []
  if (!ogUrl) {
    return errors
  }
  return errors
}

export const validateOgUrlWarnings = (ogUrl: string | undefined): string[] => {
  const warnings: string[] = []
  if (!ogUrl) {
    warnings.push('Missing og:url.')
    return warnings
  }
  return warnings
}

export const validateOgSiteNameErrors = (
  ogSiteName: string | undefined
): string[] => {
  const errors: string[] = []
  if (!ogSiteName) {
    return errors
  }
  return errors
}

export const validateOgSiteNameWarnings = (
  ogSiteName: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogSiteName) {
    warnings.push('Missing og:site_name.')
    return warnings
  }
  return warnings
}

export const validateOgTypeErrors = (ogType: string | undefined): string[] => {
  const errors: string[] = []
  if (!ogType) {
    return errors
  }
  if (
    !ogType.startsWith('website') &&
    !ogType.startsWith('article') &&
    !ogType.startsWith('video') &&
    !ogType.startsWith('music') &&
    !ogType.startsWith('book') &&
    !ogType.startsWith('profile') &&
    !ogType.startsWith('website')
  ) {
    errors.push('Invalid og:type.')
  }
  return errors
}

export const validateOgTypeWarnings = (
  ogType: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!ogType) {
    warnings.push('Missing og:type.')
    return warnings
  }
  return warnings
}

export const validateTwitterTitleErrors = (
  twitterTitle: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterTitle) {
    return errors
  }
  return errors
}

export const validateTwitterTitleWarnings = (
  twitterTitle: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterTitle) {
    warnings.push('Missing twitter:title.')
    return warnings
  }
  return warnings
}

export const validateTwitterDescriptionErrors = (
  twitterDescription: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterDescription) {
    return errors
  }
  return errors
}

export const validateTwitterDescriptionWarnings = (
  twitterDescription: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterDescription) {
    warnings.push('Missing twitter:description.')
    return warnings
  }
  return warnings
}

export const validateTwitterCardErrors = (
  twitterCard: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterCard) {
    errors.push('Missing twitter:card.')
    return errors
  }
  if (
    !['summary', 'summary_large_image', 'app', 'player'].includes(twitterCard)
  ) {
    errors.push('Invalid twitter:card.')
  }
  return errors
}

export const validateTwitterCardWarnings = (
  twitterCard: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterCard) {
    return warnings
  }
  return warnings
}

export const validateTwitterImageErrors = async (
  twitterImage: string | undefined
): Promise<string[]> => {
  const errors: string[] = []
  if (!twitterImage) {
    return errors
  }

  const isValidImage = await isImageValidServer(twitterImage)
  if (!isValidImage) {
    errors.push(
      "Couldn't load twitter:image. Check if URL is valid and accessible."
    )
  }
  return errors
}

export const validateTwitterImageWarnings = async (
  twitterImage: string | undefined
): Promise<string[]> => {
  const warnings: string[] = []
  if (!twitterImage) {
    warnings.push('Missing twitter:image.')
    return warnings
  }

  // const dimensions = await getImageSizeFromUrl(twitterImage)
  // const aspectRatio = dimensions.width / dimensions.height
  // if (
  //   dimensions.width !== dimensions.height &&
  //   (aspectRatio < 1.8 || aspectRatio > 2)
  // ) {
  //   warnings.push(
  //     'twitter:image is recommended to have an aspect ratio close to 1.91:1 or 1:1 to avoid cropping.'
  //   )
  // }

  return warnings
}

export const validateTwitterImageSrcErrors = (
  twitterImageSrc: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterImageSrc) {
    return errors
  }
  return errors
}

export const validateTwitterImageSrcWarnings = (
  twitterImageSrc: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterImageSrc) {
    warnings.push('Missing twitter:image:src.')
    return warnings
  }
  return warnings
}

export const validateTwitterImageWidthErrors = (
  twitterImageWidth: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterImageWidth) {
    return errors
  }
  return errors
}

export const validateTwitterImageWidthWarnings = (
  twitterImageWidth: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterImageWidth) {
    warnings.push('Missing twitter:image:width.')
    return warnings
  }
  return warnings
}

export const validateTwitterImageHeightErrors = (
  twitterImageHeight: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterImageHeight) {
    return errors
  }
  return errors
}

export const validateTwitterImageHeightWarnings = (
  twitterImageHeight: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterImageHeight) {
    warnings.push('Missing twitter:image:height.')
    return warnings
  }
  return warnings
}

export const validateTwitterImageTypeErrors = (
  twitterImageType: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterImageType) {
    return errors
  }
  if (!['image/jpeg', 'image/png', 'image/gif'].includes(twitterImageType)) {
    errors.push('Invalid twitter:image:type.')
  }
  return errors
}

export const validateTwitterImageTypeWarnings = (
  twitterImageType: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterImageType) {
    warnings.push('Missing twitter:image:type.')
    return warnings
  }
  return warnings
}

export const validateTwitterSiteErrors = (
  twitterSite: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterSite) {
    return errors
  }
  if (!twitterSite.startsWith('@')) {
    errors.push('Invalid twitter:site.')
  }
  return errors
}

export const validateTwitterSiteWarnings = (
  twitterSite: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterSite) {
    warnings.push('Missing twitter:site.')
    return warnings
  }
  return warnings
}

export const validateTwitterCreatorErrors = (
  twitterCreator: string | undefined
): string[] => {
  const errors: string[] = []
  if (!twitterCreator) {
    return errors
  }
  if (!twitterCreator.startsWith('@')) {
    errors.push('Invalid twitter:creator.')
  }
  return errors
}

export const validateTwitterCreatorWarnings = (
  twitterCreator: string | undefined
): string[] => {
  const warnings: string[] = []
  if (!twitterCreator) {
    warnings.push('Missing twitter:creator.')
    return warnings
  }
  return warnings
}
