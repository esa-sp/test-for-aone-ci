// GET /api/users/:id —— Nuxt server route 动态参数
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id');
  return { user: id, source: 'nuxt' };
});
