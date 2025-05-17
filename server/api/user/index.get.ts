import prisma from '~~/server/utils/prisma'
import type { User } from '~/utils/models'

export default defineProtectedEventHandler<User>(async (_event, userId) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        subscriptions: true,
        reports: true,
        preference: true,
        // feedbacks: true,
      },
    })

    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      subscriptions: user.subscriptions.map<Subscription>(({ id, name, expiresAt }) => ({ id, name, expiresAt })),
      reports: user.reports.map(({ id, scale, status, data, value, patientId, createdAt }) => ({
        id,
        scale,
        status,
        data: JSON.parse(data?.toString() ?? '[]'),
        value: JSON.parse(value?.toString() ?? '[]'),
        patientId,
        createdAt,
      })),
      preference: user.preference ? { colorMode: user.preference.isModeLight ? 'light' : 'dark', payment: user.preference.payment.toLowerCase() as 'upi' } : null,
    }
  } catch (error: unknown) {
    console.error('API user/index GET', error)

    if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2025') throw createError({ statusCode: 404, statusMessage: 'User Not Found' })

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
