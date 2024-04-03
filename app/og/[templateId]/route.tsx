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

const FREE_IMAGES = 500

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
                    ...(layer.widthType === 'fixed'
                      ? { width: layer.width }
                      : {}),
                    ...(layer.heightType === 'fixed'
                      ? { height: layer.height }
                      : {}),
                    wordBreak: 'break-all',
                    overflow: 'hidden',
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
                      fontFamily: layer.family.replace(/-/g, ' '),
                      fontSize: layer.size,
                      lineHeight: layer.lineHeight,
                      color: layer.color,
                      opacity: layer.opacity,
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
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter Thin',
            data: await fetch(
              new URL('../../../assets/inter-thin.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 100,
            style: 'normal',
          },
          {
            name: 'Inter Extra Light',
            data: await fetch(
              new URL('../../../assets/inter-extra-light.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 200,
            style: 'normal',
          },
          {
            name: 'Inter Light',
            data: await fetch(
              new URL('../../../assets/inter-light.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 300,
            style: 'normal',
          },
          {
            name: 'Inter Regular',
            data: await fetch(
              new URL('../../../assets/inter-regular.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter Medium',
            data: await fetch(
              new URL('../../../assets/inter-medium.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 500,
            style: 'normal',
          },
          {
            name: 'Inter Semi Bold',
            data: await fetch(
              new URL('../../../assets/inter-semi-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter Bold',
            data: await fetch(
              new URL('../../../assets/inter-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 700,
            style: 'normal',
          },
          {
            name: 'Inter Extra Bold',
            data: await fetch(
              new URL('../../../assets/inter-extra-bold.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 800,
            style: 'normal',
          },
          {
            name: 'Inter Black',
            data: await fetch(
              new URL('../../../assets/inter-black.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 900,
            style: 'normal',
          },
        ],
        debug: false,
      }
    )
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
