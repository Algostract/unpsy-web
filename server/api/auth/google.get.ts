async function findOrCreateNotionUser(authUser: { sub: string; name: string; picture: string; email: string }): Promise<{
  id: string
  name: string
  avatar: string
  email: string
  createdAt: string
  updatedAt: string
}> {
  const config = useRuntimeConfig()
  const notionDbId = config.private.notionDbId as unknown as { user: string }

  const query = await notion.databases.query({
    database_id: notionDbId.user,
    filter: {
      property: 'Email',
      email: { equals: authUser.email },
    },
  })

  if (query.results.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = query.results[0] as any

    await notion.pages.update({
      page_id: data.id,
      cover: {
        type: 'external',
        external: { url: authUser.picture },
      },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: authUser.name } }],
        },
      },
    })

    return {
      id: data.id,
      name: notionTextStringify(data.properties.Name.title),
      avatar: data.cover?.external.url || authUser.picture,
      email: data.properties.Email.email || '',
      createdAt: data.created_time || new Date().toISOString(),
      updatedAt: data.last_edited_time || new Date().toISOString(),
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await notion.pages.create({
    parent: { database_id: notionDbId.user },
    cover: {
      type: 'external',
      external: {
        url: authUser.picture,
      },
    },
    properties: {
      Name: {
        type: 'title',
        title: [{ type: 'text', text: { content: authUser.name } }],
      },
      Email: { type: 'email', email: authUser.email },
    },
  })

  return {
    id: data.id,
    name: notionTextStringify(data.properties.Name.title),
    avatar: data.cover?.external.url || authUser.picture,
    email: data.properties.Email.email || '',
    createdAt: data.created_time || new Date().toISOString(),
    updatedAt: data.last_edited_time || new Date().toISOString(),
  }
}

export default defineOAuthGoogleEventHandler({
  config: {},
  async onSuccess(event, { user: data }) {
    const user = await findOrCreateNotionUser(data)

    await setUserSession(event, {
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      logged_at: new Date().toISOString(),
    })

    return sendRedirect(event, '/dashboard')
  },
  onError(event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  },
})
