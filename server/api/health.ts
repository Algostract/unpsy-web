export default defineEventHandler<{ status: string }>((event) => {
  const config = useRuntimeConfig().app
  // console.log({ config });

  return { status: 'OK', ...config }
})
