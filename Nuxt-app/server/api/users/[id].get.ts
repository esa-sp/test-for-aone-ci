// GET /api/users/:id
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  return {
    user: id,
    source: 'nuxt',
    name: `用户#${id}`
  }
})
