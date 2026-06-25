// GET /api/health
export default defineEventHandler(() => ({
  ok: true,
  framework: 'nuxt',
  service: 'ISR 示例',
  message: '服务运行中',
  timestamp: new Date().toISOString()
}));
