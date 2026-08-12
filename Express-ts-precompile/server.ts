import express from 'express';

const app = express();
app.get('/', (req, res) => res.send('hello from ts'));
app.get('/api/health', (req, res) => res.json({ ok: true, from: 'express-ts' }));

const port = process.env.PORT || 3000;
app.listen(port);
