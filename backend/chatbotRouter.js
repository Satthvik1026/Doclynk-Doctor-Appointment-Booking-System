import express from 'express';
import { askChatbot } from '../backend/controllers/chatbotController.js';

const chatbotRouter = express.Router();

chatbotRouter.post('/ask', askChatbot);

export default chatbotRouter;