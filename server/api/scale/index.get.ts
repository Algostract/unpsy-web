export default defineCachedEventHandler<Promise<SubscribedScale[]>>(
  async () => {
    try {
      const scales = await readYamlFile<SubscribedScale>('scales.yml')

      if (!scales) throw createError({ statusCode: 500, statusMessage: 'scales is undefined' })

      return scales.map(({ name, type, count, subScales, options, monthlyPrice, publishedAt, updatedAt }) => {
        // const subscribedScale = subscribedScales.find((subscribedScale) => subscribedScale.name === name)

        return {
          name: name,
          type: type.toLowerCase() as ScaleType,
          count,
          options,
          subScales,
          monthlyPrice,
          // expiresAt: subscribedScale?.expiresAt.toISOString() ?? null,
          updatedAt: updatedAt,
          publishedAt: publishedAt,
        }
      })
    } catch (error: unknown) {
      console.error('API scale/index GET', error)

      throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
    }
  },
  { maxAge: 60 * 60 }
)
