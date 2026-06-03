const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, framework: 'express', style: 'multifile' });
});

module.exports = router;
