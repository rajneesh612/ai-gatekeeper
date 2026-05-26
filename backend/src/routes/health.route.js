// health.route.js
// Basic health check route
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'AI Gatekeeper backend healthy' });
});

export default router;
