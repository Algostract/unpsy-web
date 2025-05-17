import path from 'node:path'
import fs from 'node:fs'
import { randomUUID } from 'node:crypto'
import { ofetch } from 'ofetch'

import prisma from '~~/server/utils/prisma'
import { type ScaleName, ScaleNameToDBScaleName, DBScaleNameToScaleName, type ScaleType } from '~/utils/models'

async function saveImages(images: string[]): Promise<void> {
  const buffer = Buffer.from(images[0].split(',')[1], 'base64')

  const id = randomUUID()
  const storage = useStorage()
  const filePath = path.join(process.cwd(), `assets/documents/${id}.jpg`)

  try {
    storage.setItem(id, 'pending')
    fs.writeFileSync(filePath, buffer)
    storage.setItem(id, true)
    console.log(`Image saved as: ${id}`)
  } catch (error) {
    storage.setItem(id, false)
    console.error(`Error saving image: ${id}`, error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to save images' })
  }
}

export default defineProtectedEventHandler<{
  data: {
    name: ScaleName
    type: ScaleType
    count: number
    options: { name: string; value: number }[]
    choices: { index: number; value: number | null }[]
  }
  highlights: string[]
}>(async (event, userId) => {
  const config = useRuntimeConfig()

  try {
    const images = await readBody<string[]>(event)

    saveImages(images)

    try {
      const { data, highlights } = await ofetch<{
        data: {
          name: ScaleName
          choices: { index: number; value: number | null }[]
        }
        highlights: string[]
      }>('/scan', {
        baseURL: config.public.omrUrl,
        method: 'POST',
        body: images,
      })

      const { expiresAt, scale: DBScale } = await prisma.subscription.findUniqueOrThrow({
        where: {
          name_userId: {
            name: ScaleNameToDBScaleName[data.name],
            userId,
          },
        },
        select: {
          scale: {
            select: {
              name: true,
              type: true,
              count: true,
              options: true,
            },
          },
          expiresAt: true,
        },
      })

      if (isExpired(expiresAt)) throw createError({ statusCode: 400, statusMessage: 'Subscription Expired' })
      else if (Math.floor(DBScale.count / 90) !== images.length) throw createError({ statusCode: 400, statusMessage: 'Total Page Mismatched' })

      return {
        data: {
          name: DBScaleNameToScaleName[DBScale.name],
          type: DBScale.type.toLowerCase() as ScaleType,
          count: DBScale.count,
          options: DBScale.options,
          choices: data.choices,
        },
        highlights,
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'code' in error) throw error

      const typedError = error as { statusCode: number; data: { detail: string } }
      throw createError({ statusCode: typedError.statusCode, statusMessage: typedError.data.detail })
    }
  } catch (error: unknown) {
    console.error('API scale/scan POST', error)

    if (error && typeof (error as { statusCode?: number }).statusCode === 'number') throw error
    else if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2025')
      throw createError({ statusCode: 404, statusMessage: 'Subscription Not Found' })

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
