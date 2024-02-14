import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = (await request.json()) as { email: string }

  try {
    if (!body.email) {
      return Response.json({ error: 'Email is required' })
    }

    const data = await resend.contacts.create({
      email: body.email,
      audienceId: '814b11f0-62c3-4187-a593-4d8e94bf3fd9',
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
