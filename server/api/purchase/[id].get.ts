import prisma from '~/lib/prisma'
import { type PurchaseStatus } from '~/utils/models'

export default defineProtectedEventHandler<{ status: PurchaseStatus }>(async (event, userId) => {
  const id = getRouterParam(event, 'id') ?? ''
  try {
    const purchase = await prisma.purchase.findUniqueOrThrow({
      where: {
        id_userId: {
          id,
          userId,
        },
      },
      select: {
        status: true,
      },
    })

    return { status: purchase.status.toLowerCase() as PurchaseStatus }
  } catch (error: any) {
    console.error('API purchase/[id] GET', error)

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
