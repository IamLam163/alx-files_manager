import express from 'express';
import APPController from '../controllers/AppController';

const router = express.Router();

router.get('/status', APPController.getStatus);
router.get('/stats', APPController.getStats);

export default router;
