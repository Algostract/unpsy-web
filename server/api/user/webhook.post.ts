import { Plan, type Gender } from '@prisma/client'
import prisma from '~~/lib/prisma'

export default defineEventHandler<Promise<{ id: string; name: string }>>(async (event) => {
  const config = useRuntimeConfig()
  try {
    const signature = event.node.req.headers['signature'] as string

    if (signature == null) throw createError({ statusCode: 401, statusMessage: 'Signature Not found' })

    const body = await readBody<{
      id: string
      name: string
      image: string
      email: string
      phone: string
      dob: string
      gender: string
    }>(event)
    if (!validateSignature(JSON.stringify(body), signature, config.private.authWebhook)) throw createError({ statusCode: 403, statusMessage: 'Invalid Signature' })

    // const scales = dataScales
    const user = await prisma.user.create({
      data: {
        id: body.id,
        name: body.name.toLowerCase(),
        email: body.email,
        phone: body.phone,
        dob: body.dob ? new Date(body.dob).toISOString() : null,
        gender: capitalize(body.gender) as Gender,
        preference: {
          create: {
            isModeLight: true,
            payment: 'UPI',
          },
        },
        subscriptions: {
          create: {
            name: Plan.Free,
            expiresAt: addTimeToNow({ days: 3650 }),
          },
        },
      },
    })

    return { id: user.id, name: user.name }
  } catch (error: unknown) {
    console.error('API user/webhook POST', error)

    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2002')
      throw createError({ statusCode: 409, statusMessage: 'Phone or Email already exists' })
    if (typeof error === 'object' && error !== null && 'statusCode' in error) throw error

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
