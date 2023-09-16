import Express, { Request, Response } from 'express'
import { sendNotification } from '../controllers/notification.controller';

const router = Express.Router()

router.post('/send-notification', sendNotification);

export default router