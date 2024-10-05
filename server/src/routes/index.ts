import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

router.use('/auth', authRoutes);

router.use('/api', authenticateToken, apiRoutes);

router.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../client/dist', 'index.html'));
  console.log('Serving index.html');
  console.log(
    'Path:',
    path.resolve(__dirname, '../../../client/dist', 'index.html'),
  );
});

export default router;
