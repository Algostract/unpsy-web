import prisma from '~~/lib/prisma'
import { validateSignature } from '~~/server/utils/helpers'

export default defineEventHandler<{ id: string; name: string; email: string | null; phone: string }>(async (event) => {
  const config = useRuntimeConfig()
  const query = JSON.stringify(getQuery(event))
  try {
    const signature = event.node.req.headers['signature'] as string

    if (signature == null) throw createError({ statusCode: 401, statusMessage: 'Signature Not found' })

    if (!validateSignature(query, signature, config.private.authWebhook)) throw createError({ statusCode: 403, statusMessage: 'Invalid Signature' })

    const parsedQuery = JSON.parse(query)

    const user = await prisma.user.findUniqueOrThrow({
      where: parsedQuery,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    })

    return user
  } catch (error: unknown) {
    console.error('API user/webhook GET', error)

    if (error && typeof (error as { statusCode?: number }).statusCode === 'number') throw error
    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2025') throw createError({ statusCode: 404, statusMessage: 'User Not Found' })

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
