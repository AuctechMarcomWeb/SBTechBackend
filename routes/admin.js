import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import {
  login,
  getStats,
  getLeads,
  getScans,
  deleteLead,
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login',         login);
router.get('/stats',  adminAuth, getStats);
router.get('/leads',  adminAuth, getLeads);
router.get('/scans',  adminAuth, getScans);
router.delete('/leads/:id', adminAuth, deleteLead);

export default router;
