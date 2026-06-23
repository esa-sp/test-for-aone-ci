const { Router } = require('express');
const router = Router();

// GET /api/items?page=1&size=10
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const items = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: `任务-${(page - 1) * size + i + 1}`,
    status: 'pending',
  }));
  res.json({ page, size, items, total: 100, service: '任务管理' });
});

module.exports = router;
