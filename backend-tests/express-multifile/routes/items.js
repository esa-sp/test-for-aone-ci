const { Router } = require('express');
const router = Router();

// GET /api/items?page=1&size=10
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const items = Array.from({ length: size }, (_, i) => ({
    id: (page - 1) * size + i + 1,
    name: `item-${(page - 1) * size + i + 1}`,
  }));
  res.json({ page, size, items, total: 100 });
});

module.exports = router;
