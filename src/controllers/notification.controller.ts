import { Request, Response } from "express";
import firebase from 'firebase-admin'
import { BadRequestError, UnathorizedError } from "../utils/custom_error";

export const sendNotification = async (req: Request, res: Response) => {
    const {token, title, body } = req.body
    if(!token) throw new BadRequestError('FCM token is required')
    if(!title) throw new BadRequestError('Title is required')
    if(!body) throw new BadRequestError('Body is required');

    try {
        const fcmMessage = {
            'token': token,
            'notification': {
                'title': title,
                'body': body
            }
        }
       await firebase.messaging().send(fcmMessage)
       res.status(200).json({
        'status': true,
        'message': 'Notification sent successfully'
    })

    } catch(err: any) {
        if(err.code == 'messaging/mismatched-credential') {
            throw new UnathorizedError('Unauthorized request')
        }
       throw new BadRequestError('Internal Server error');
    }
}