import { FREE_IMAGES } from '@/app/constants'
import {
  getProjectRedis,
  getTemplateInfoRedis,
  getTemplateRedis,
  getTemplateUrlsRedis,
  getUserUsage,
  logProjectUsage,
  logTemplateUrlToListRedis,
  logUserUsage,
} from '@/app/lib/upstash'
import { convertOpacityToHex } from '@/app/utils'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'
export const revalidate = 60

const adminKey = process.env.ADMIN_VARIABLES_ENCRYPTION_KEY

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const templateId = searchParams.get('templateId')
  const encryptedVariables = searchParams.get('variables') as string
  // const decryptedVariables = decrypt(variables, adminKey ?? '')
  // const { searchParams: decryptedParams } = new URL(
  //   `${req.nextUrl.origin}${decryptedVariables}`
  // )

  function getSearchParams(value: string) {
    if (encryptedVariables) {
      //return decryptedParams.get(value)
    } else {
      return searchParams.get(value)
    }
  }

  if (!templateId) {
    return new Response('Missing templateId', { status: 400 })
  }

  try {
    const templateLayers = await getTemplateRedis(templateId)
    const templateInfo = await getTemplateInfoRedis(templateId)

    if (!templateLayers || !templateInfo) {
      return new Response('Template not found', { status: 404 })
    }

    // Usage tracking
    const searchParamsString = encryptedVariables
      ? '' //decryptedParams.toString()
      : searchParams.toString()
    const generatedUrls = await getTemplateUrlsRedis(templateId)
    const alreadyGenerated = generatedUrls?.includes(searchParamsString)

    if (!alreadyGenerated) {
      const projectInfo = await getProjectRedis(templateInfo.projectId)
      if (!projectInfo) {
        return new Response('Project not found', { status: 404 })
      }

      if (projectInfo.subscriptionData?.plan === 'free') {
        const projectOwnerUsage = await getUserUsage(projectInfo.ownerUserId)
        if (!projectOwnerUsage || projectOwnerUsage < FREE_IMAGES) {
          await logTemplateUrlToListRedis(templateId, searchParamsString)
          await logUserUsage(projectInfo.ownerUserId)
        } else {
          return new Response(
            'Free usage limit reached, upgrade to Pro to create more images.',
            { status: 403 }
          )
        }
      }

      if (projectInfo.subscriptionData?.plan === 'pro') {
        await logTemplateUrlToListRedis(templateId, searchParamsString)
        await logProjectUsage(templateInfo.projectId)
      }
    }

    // Load fonts
    const usedFonts = templateLayers
      .filter((layer) => layer.type === 'text')
      .map((layer) => {
        if (layer.type === 'text') {
          return {
            fontName: layer.fontName,
            fontUrl: layer.fontUrl,
            fontWeight: layer.fontWeight,
          }
        }
      })
    // Remove duplicates
    const uniqueFonts = [...new Set(usedFonts)]

    const fontsToLoad = await Promise.all(
      uniqueFonts.map(async (font) => {
        return {
          name: font?.fontName,
          data: await fetch(
            new URL(
              font?.fontUrl ?? '../../../assets/inter-regular.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: font?.fontWeight,
          style: 'normal',
        } as any
      })
    )

    const options = {
      width: 1200,
      height: 630,
      fonts: [...fontsToLoad],
      debug: false,
    }

    return new ImageResponse(
      (
        <div
          tw="flex w-full h-full"
          style={{
            backgroundColor: templateInfo?.canvasBackgroundColor ?? '#ffffff',
          }}
        >
          {/* This is replicated with html on template editor*/}
          {templateLayers?.toReversed()?.map((layer) => {
            if (layer.type === 'text') {
              return (
                <div
                  key={layer.id}
                  style={{
                    display: layer.conditionalVisibility
                      ? getSearchParams(
                          layer.conditionalVisibilityVariableName
                        ) === 'true'
                        ? 'flex'
                        : 'none'
                      : 'flex',
                    position: 'absolute',
                    justifyContent: layer.alignHorizontal,
                    alignItems: layer.alignVertical,
                    left: layer.x,
                    top: layer.y,
                    transform: `rotate(${layer.rotation}deg)`,
                    // Background styles
                    backgroundColor: layer.background
                      ? `${layer.bgColor}${convertOpacityToHex(layer.bgOpacity)}`
                      : 'transparent',
                    paddingLeft: layer.bgPaddingX ? layer.bgPaddingX : 0,
                    paddingRight: layer.bgPaddingX ? layer.bgPaddingX : 0,
                    paddingTop: layer.bgPaddingY ? layer.bgPaddingY : 0,
                    paddingBottom: layer.bgPaddingY ? layer.bgPaddingY : 0,
                    borderRadius: layer.bgCornerRadius ?? 0,
                  }}
                >
                  <div
                    style={{
                      display: 'block',
                      wordBreak: 'break-word',
                      fontFamily: layer.fontName,
                      fontSize: layer.size,
                      lineHeight: layer.lineHeight,
                      color: layer.color,
                      opacity: layer.opacity,
                      ...(layer.widthType === 'fixed'
                        ? { width: layer.width }
                        : { textOverflow: 'ellipsis', whiteSpace: 'nowrap' }),
                      height: layer.height,
                      lineClamp: layer.lineClamp ?? 9999,
                      textAlign:
                        layer.alignHorizontal === 'center'
                          ? 'center'
                          : layer.alignHorizontal === 'flex-end'
                            ? 'right'
                            : 'left',
                      verticalAlign:
                        layer.alignVertical === 'center'
                          ? 'middle'
                          : layer.alignVertical === 'flex-end'
                            ? 'bottom'
                            : 'top',
                    }}
                  >
                    {layer.conditionalValue
                      ? getSearchParams(layer.conditionalValueVariableName) ??
                        layer.exampleValue
                      : layer.value}
                  </div>
                </div>
              )
            }
            if (
              layer.type === 'image' &&
              ((layer.conditionalValue && layer.exampleSrc) ||
                (!layer.conditionalValue && layer.src))
            ) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={layer.id}
                  alt=""
                  src={
                    layer.conditionalValue
                      ? getSearchParams(layer.conditionalValueVariableName) ??
                        layer.exampleSrc
                      : layer.src
                  }
                  width={layer.width}
                  height={layer.height}
                  tw="items-center justify-center"
                  style={{
                    display: layer.conditionalVisibility
                      ? getSearchParams(
                          layer.conditionalVisibilityVariableName
                        ) === 'true'
                        ? 'flex'
                        : 'none'
                      : 'flex',
                    position: 'absolute',
                    left: layer.x,
                    top: layer.y,
                    width: layer.width,
                    height: layer.height,
                    transform: `rotate(${layer.rotation}deg)`,
                    opacity: layer.opacity,
                    borderRadius: layer.cornerRadius,
                    objectFit: layer.objectFit,
                  }}
                />
              )
            }
            if (layer.type === 'rectangle') {
              return (
                <div
                  key={layer.id}
                  tw="items-center justify-center"
                  style={{
                    display: layer.conditionalVisibility
                      ? getSearchParams(
                          layer.conditionalVisibilityVariableName
                        ) === 'true'
                        ? 'flex'
                        : 'none'
                      : 'flex',
                    position: 'absolute',
                    left: layer.x,
                    top: layer.y,
                    transform: `rotate(${layer.rotation}deg)`,
                    width: layer.width,
                    height: layer.height,
                    borderRadius: layer.cornerRadius,
                    opacity: layer.opacity,
                    backgroundColor: layer.color,
                  }}
                />
              )
            }
          })}
        </div>
      ),
      options
    )
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

async function fetchGoogleFont(
  font: string,
  weight: number
): Promise<ArrayBuffer | null> {
  const API = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&display=swap`

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF by simulating a common browser user-agent
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text()

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (!resource) return null

  const res = await fetch(resource[1])

  return res.arrayBuffer()
}
