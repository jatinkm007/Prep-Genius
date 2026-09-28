import { Router } from 'express';
import { executeCode } from '../controllers/execution.controller.js';

const router = Router();

// POST /api/v1/execute
router.post('/execute', executeCode);

export default router;