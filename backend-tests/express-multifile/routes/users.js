const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth');
const { UserService } = require('../services/userService');

const router = Router();
const userService = new UserService();

// GET /api/users/:id — 公开接口
router.get('/:id', (req, res) => {
  const user = userService.findById(req.params.id);
  res.json({ ...user, source: 'express-multifile' });
});

// POST /api/users — 需要认证
router.post('/', authMiddleware, (req, res) => {
  const created = userService.create(req.body);
  res.status(201).json(created);
});

module.exports = router;
