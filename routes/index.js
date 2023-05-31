import express from 'express';
import APPController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = express.Router();

router.get('/status', APPController.getStatus);
router.get('/stats', APPController.getStats);
router.post('/users', UsersController.postNew);

export default router;
