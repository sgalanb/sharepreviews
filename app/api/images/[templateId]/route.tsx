import { LayerType } from '@/app/(editor)/[project]/templates/[templateId]/edit/page'
import { getTemplateRedis } from '@/app/lib/upstash'
import { downloadFont } from '@/app/utils'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const templateId = req.nextUrl.pathname.split('/')[3]
  if (!templateId) {
    return new Response('Missing templateId', { status: 400 })
  }

  const layers = (await getTemplateRedis(templateId)) as LayerType[]

  // Fonts
  const interThin = await downloadFont(
    'https://utfs.io/f/214b8ddf-2967-43c2-a8e6-a61a4d2c4e45-5nk5re.otf'
  )
  const interExtraLight = await downloadFont(
    'https://utfs.io/f/c3e57e57-9bc3-4aa4-9e8f-be3449318044-rjtumh.otf'
  )
  const interLight = await downloadFont(
    'https://utfs.io/f/903ba127-3d59-4c0d-ad78-2faa3c287517-x3r3c5.otf'
  )
  const interRegular = await downloadFont(
    'https://utfs.io/f/93a8ed78-9aae-43a5-a66f-6f3e95923f56-6h2v6z.otf'
  )
  const interMedium = await downloadFont(
    'https://utfs.io/f/23672c7f-ae6d-4a4e-937e-bc71e4324d72-w7jnpi.otf'
  )
  const interSemiBold = await downloadFont(
    'https://utfs.io/f/e93c4078-56ee-4a0f-a8d3-82880b7391ca-j2ou90.otf'
  )
  const interBold = await downloadFont(
    'https://utfs.io/f/e88c938c-49a8-47f5-92b5-a9d63d621c73-5n8t92.otf'
  )
  const interExtraBold = await downloadFont(
    'https://utfs.io/f/76e9de6f-63a6-43bc-8237-eed53baa9269-v6nn44.otf'
  )
  const interBlack = await downloadFont(
    'https://utfs.io/f/061a6245-d7c7-4bb0-8ccb-10ce431d0769-wyaxse.otf'
  )

  return new ImageResponse(
    (
      <div tw="flex w-full h-full" style={{ backgroundColor: '#ffffff' }}>
        {layers.toReversed().map((layer) => {
          if (layer.type === 'text') {
            return (
              <div
                key={layer.id}
                style={{
                  display: layer.conditionalVisibility
                    ? searchParams.get(
                        layer.conditionalVisibilityVariableName
                      ) === 'true'
                      ? 'flex'
                      : 'none'
                    : 'flex',
                  justifyContent: layer.alignHorizontal,
                  alignItems: layer.alignVertical,
                  position: 'absolute',
                  left: layer.x,
                  top: layer.y,
                  width: layer.width,
                  height: layer.height,
                  transform: `rotate(${layer.rotation}deg)`,
                  opacity: layer.opacity,
                }}
              >
                <p
                  style={{
                    fontFamily: layer.family,
                    fontSize: layer.size,
                    lineHeight: layer.lineHeight,
                    color: layer.color,
                  }}
                >
                  {layer.conditionalValue
                    ? searchParams.get(layer.conditionalValueVariableName) ??
                      layer.exampleValue
                    : layer.value}
                </p>
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
                    ? searchParams.get(layer.conditionalValueVariableName) ??
                      layer.exampleSrc
                    : layer.src
                }
                width={layer.width}
                height={layer.height}
                tw="items-center justify-center"
                style={{
                  display: layer.conditionalVisibility
                    ? searchParams.get(
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
                    ? searchParams.get(
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
                  backgroundColor: layer.color,
                  borderRadius: layer.cornerRadius,
                }}
              ></div>
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
          data: interThin,
          weight: 100,
          style: 'normal',
        },
        {
          name: 'Inter Extra Light',
          data: interExtraLight,
          weight: 200,
          style: 'normal',
        },
        {
          name: 'Inter Light',
          data: interLight,
          weight: 300,
          style: 'normal',
        },
        {
          name: 'Inter Regular',
          data: interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter Medium',
          data: interMedium,
          weight: 500,
          style: 'normal',
        },
        {
          name: 'Inter Semi Bold',
          data: interSemiBold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Inter Bold',
          data: interBold,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter Extra Bold',
          data: interExtraBold,
          weight: 800,
          style: 'normal',
        },
        {
          name: 'Inter Black',
          data: interBlack,
          weight: 900,
          style: 'normal',
        },
      ],
      debug: false,
    }
  )
}