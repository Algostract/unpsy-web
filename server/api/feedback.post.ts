import { Client } from '@notionhq/client'

interface Request {
  name: string,
  email: string,
  phone: string,
  helpful: boolean,
  accuracy: boolean,
  interested: boolean,
  recommend: boolean,
  suggestion: string
}

const config = useRuntimeConfig()
const notion = new Client({
  auth: config.private.notionKey,
})

export default defineProtectedEventHandler(async (event, userId) => {
  try {
    const { name, email, phone, helpful, accuracy, interested, recommend, suggestion } = await readBody<Request>(event)

    const result = await notion.pages.create({
      parent: {
        database_id: config.private.notionDBId,
      },
      properties: {
        'ID': {
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
                color: 'default'
              },
              text: {
                content: userId,
                link: null
              },
            },
          ],
        },
        'Name': {
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
        'Email': {
          type: 'email',
          email: email
        },
        Phone: {
          type: 'phone_number',
          phone_number: phone
        },
        Helpful: {
          checkbox: helpful,
        }, Accuracy: {
          checkbox: accuracy,
        }, Interested: {
          checkbox: interested,
        }, Recommend: {
          checkbox: recommend,
        }, Suggestion: {
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
                color: 'default'
              },
              text: {
                content: suggestion,
                link: null
              },
            },
          ],
        }
      },
    })

    return { success: true }
  } catch (error: any) {
    console.error('API feedback POST', error)

    if (error.statusMessage) throw error

    throw createError({
      statusCode: 500,
      statusMessage: 'Some Unknown Error Found',
    })
  }
})