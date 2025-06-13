interface Request {
  helpful: boolean
  accuracy: boolean
  interested: boolean
  recommend: boolean
  suggestion: string
}

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const notionDbId = config.private.notionDbId as unknown as NotionDB
    const { user } = await requireUserSession(event)

    const { helpful, accuracy, interested, recommend, suggestion } = await readBody<Request>(event)

    await notion.pages.create({
      parent: {
        database_id: notionDbId.feedback,
      },
      properties: {
        Id: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: user.id,
              },
            },
          ],
        },
        User: {
          type: 'relation',
          relation: [{ id: user.id }],
        },
        Helpful: {
          checkbox: helpful,
        },
        Accuracy: {
          checkbox: accuracy,
        },
        Interested: {
          checkbox: interested,
        },
        Recommend: {
          checkbox: recommend,
        },
        Suggestion: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              annotations: {
                bold: false,
                italic: true,
                strikethrough: false,
                underline: false,
                code: false,
                color: 'default',
              },
              text: {
                content: suggestion,
                link: null,
              },
            },
          ],
        },
      },
    })

    return { success: true }
  } catch (error: unknown) {
    console.error('API feedback POST', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})
