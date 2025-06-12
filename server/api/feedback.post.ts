interface Request {
  name: string
  email: string
  phone: string
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

    const { name, email, phone, helpful, accuracy, interested, recommend, suggestion } = await readBody<Request>(event)

    await notion.pages.create({
      parent: {
        database_id: notionDbId.feedback,
      },
      properties: {
        ID: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content: userId,
                link: null,
              },
            },
          ],
        },
        Name: {
          type: 'title',
          title: [
            {
              type: 'text',
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          type: 'email',
          email: email,
        },
        Phone: {
          type: 'phone_number',
          phone_number: phone,
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
