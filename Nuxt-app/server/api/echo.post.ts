// POST /api/echo
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return {
    received: body,
    echoed: true,
    timestamp: new Date().toISOString()
  }
})
