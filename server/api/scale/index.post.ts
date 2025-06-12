export default defineEventHandler<Promise<{ name: string; value: number }[]>>(async (event) => {
  try {
    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB

    const { scale: scaleName, data } = await readBody<{
      scale: ScaleName
      data: { index: number; value: number }[]
    }>(event)

    const { user } = await requireUserSession(event)

    const scales = await readYamlFile<Scale>('scales.yml')

    if (!scales) throw createError({ statusCode: 500, statusMessage: 'scales is undefined' })

    const scale = scales.find(({ name }) => name === scaleName)

    if (scale == undefined) throw createError({ statusCode: 404, statusMessage: `${scaleName} Scale not found` })

    let result = {}
    for (const item of data) {
      if (item.value === null || !(item.value === 0 || item.value === 1 || item.value === 2 || item.value === 3 || item.value === 4 || item.value == 5))
        throw createError({ statusCode: 400, statusMessage: 'Invalid value detected. Value must be 0 to 5' })
    }

    // Calculate
    if (scale.type === 'binary')
      result = BinaryCalculate(
        scaleName,
        data.map(({ index, value }) => ({ index, value: !!value }))
      )
    else if (scale.type === 'pentanary') result = PentanaryCalculate(scaleName, data)

    const formattedResult = Object.entries(result).map(([name, value]) => ({ name, value: value as number }))

    await notion.pages.create({
      parent: { database_id: notionDbId.report },
      properties: {
        Id: {
          type: 'title',
          title: [{ type: 'text', text: { content: scaleName } }],
        },
        Scale: {
          type: 'select',
          select: { name: scaleName },
        },
        User: {
          type: 'relation',
          relation: [{ id: user.id }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'table',
          table: {
            table_width: 2,
            has_column_header: true,
            has_row_header: false,
            children: [
              {
                object: 'block' as const,
                type: 'table_row' as const,
                table_row: {
                  cells: [[{ type: 'text' as const, text: { content: 'Index' } }], [{ type: 'text' as const, text: { content: 'Value' } }]],
                },
              },
              ...data.map((item) => ({
                object: 'block' as const,
                type: 'table_row' as const,
                table_row: {
                  cells: [[{ type: 'text' as const, text: { content: String(item.index) } }], [{ type: 'text' as const, text: { content: String(item.value) } }]],
                },
              })),
            ],
          },
        },
        {
          object: 'block',
          type: 'table',
          table: {
            table_width: 2,
            has_column_header: true,
            has_row_header: false,
            children: [
              {
                object: 'block' as const,
                type: 'table_row' as const,
                table_row: {
                  cells: [[{ type: 'text' as const, text: { content: 'Sub-Scale' } }], [{ type: 'text' as const, text: { content: 'Value' } }]],
                },
              },
              ...formattedResult.map((item) => ({
                object: 'block' as const,
                type: 'table_row' as const,
                table_row: {
                  cells: [[{ type: 'text' as const, text: { content: item.name } }], [{ type: 'text' as const, text: { content: String(item.value) } }]],
                },
              })),
            ],
          },
        },
      ],
    })

    return formattedResult
  } catch (error: unknown) {
    console.error('API scale/index POST', error)

    if (typeof error === 'object' && error !== null && 'statusCode' in error && (error as { statusCode: number }).statusCode === 400) throw error
    else if (typeof error === 'object' && error !== null && 'code' in error && (error as { code: string }).code === 'P2025')
      throw createError({ statusCode: 404, statusMessage: 'Subscription Not Found' })

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
