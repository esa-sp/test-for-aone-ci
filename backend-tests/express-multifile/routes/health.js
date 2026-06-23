const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, framework: 'express', style: 'multifile', service: '任务管理', message: '服务运行中' });
});

module.exports = router;
