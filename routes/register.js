import express from 'express';
import { registerLead } from '../controllers/registerController.js';

const router = express.Router();

router.post('/register', registerLead);

export default router;
