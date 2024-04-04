import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
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

    const usedFonts = templateLayers
      .filter((layer) => layer.type === 'text')
      .map((layer: LayerType) => (layer.type === 'text' ? layer.family : ''))

    const interThin = usedFonts.includes('inter-thin')
      ? ({
          name: 'Inter Thin',
          data: await fetch(
            new URL(
              'https://utfs.io/f/214b8ddf-2967-43c2-a8e6-a61a4d2c4e45-5nk5re.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 100,
          style: 'normal',
        } as any)
      : {}

    const interExtraLight = usedFonts.includes('inter-extra-light')
      ? ({
          name: 'Inter Extra Light',
          data: await fetch(
            new URL(
              'https://utfs.io/f/c3e57e57-9bc3-4aa4-9e8f-be3449318044-rjtumh.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 200,
          style: 'normal',
        } as any)
      : {}

    const interLight = usedFonts.includes('inter-light')
      ? ({
          name: 'Inter Light',
          data: await fetch(
            new URL(
              'https://utfs.io/f/903ba127-3d59-4c0d-ad78-2faa3c287517-x3r3c5.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 300,
          style: 'normal',
        } as any)
      : {}

    const interRegular = usedFonts.includes('inter-regular')
      ? ({
          name: 'Inter Regular',
          data: await fetch(
            new URL(
              'https://utfs.io/f/93a8ed78-9aae-43a5-a66f-6f3e95923f56-6h2v6z.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 400,
          style: 'normal',
        } as any)
      : {}

    const interMedium = usedFonts.includes('inter-medium')
      ? ({
          name: 'Inter Medium',
          data: await fetch(
            new URL(
              'https://utfs.io/f/23672c7f-ae6d-4a4e-937e-bc71e4324d72-w7jnpi.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 500,
          style: 'normal',
        } as any)
      : {}

    const interSemiBold = usedFonts.includes('inter-semi-bold')
      ? ({
          name: 'Inter Semi Bold',
          data: await fetch(
            new URL(
              'https://utfs.io/f/e93c4078-56ee-4a0f-a8d3-82880b7391ca-j2ou90.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 600,
          style: 'normal',
        } as any)
      : {}

    const interBold = usedFonts.includes('inter-bold')
      ? ({
          name: 'Inter Bold',
          data: await fetch(
            new URL(
              'https://utfs.io/f/e88c938c-49a8-47f5-92b5-a9d63d621c73-5n8t92.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 700,
          style: 'normal',
        } as any)
      : {}

    const interExtraBold = usedFonts.includes('inter-extra-bold')
      ? ({
          name: 'Inter Extra Bold',
          data: await fetch(
            new URL(
              'https://utfs.io/f/76e9de6f-63a6-43bc-8237-eed53baa9269-v6nn44.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 800,
          style: 'normal',
        } as any)
      : {}

    const interBlack = usedFonts.includes('inter-black')
      ? ({
          name: 'Inter Black',
          data: await fetch(
            new URL(
              'https://utfs.io/f/061a6245-d7c7-4bb0-8ccb-10ce431d0769-wyaxse.otf',
              import.meta.url
            )
          ).then((res) => res.arrayBuffer() as any),
          weight: 900,
          style: 'normal',
        } as any)
      : {}

    const fontsToLoad = usedFonts.map((font) => {
      if (font === 'inter-thin') return interThin
      if (font === 'inter-extra-light') return interExtraLight
      if (font === 'inter-light') return interLight
      if (font === 'inter-regular') return interRegular
      if (font === 'inter-medium') return interMedium
      if (font === 'inter-semi-bold') return interSemiBold
      if (font === 'inter-bold') return interBold
      if (font === 'inter-extra-bold') return interExtraBold
      if (font === 'inter-black') return interBlack
    })

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
            name: 'Inter Regular',
            data: await fetch(
              new URL('../../../assets/inter-regular.otf', import.meta.url)
            ).then((res) => res.arrayBuffer() as any),
            weight: 400,
            style: 'normal',
          },
          ...fontsToLoad,
        ],
        debug: false,
      }
    )
  } catch (error) {
    console.error(error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
