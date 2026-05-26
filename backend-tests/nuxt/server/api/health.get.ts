// GET /api/health
export default defineEventHandler(() => ({
  ok: true,
  framework: 'nuxt',
}));
