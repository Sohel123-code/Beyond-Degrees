import express from 'express';
import { chatWithGradBuddy } from '../controllers/chatController.js';

const router = express.Router();

router.post('/gradbuddy', chatWithGradBuddy);

export default router;
