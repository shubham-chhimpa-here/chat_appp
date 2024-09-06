import express from 'express'
import  { MessageModel } from '../models/message.model.js';

const messageRouter = express.Router()

export default (io) => {
    messageRouter.get('/all', async (req, res) => {
        try {
            // const {senderId, receiverId, text} = req.body;
            const messages = await MessageModel.find()
            res.send({messages})
        
        } catch (error) {
            res.send({msg: 'something went wrong ', error: error.message})
        }
        })
        messageRouter.post('/', async (req, res) => {
        try {
            const {senderId, receiverId} = req.body;
            const messages = await MessageModel.find({ 
                $or: [
                    { senderId, receiverId},
                    { senderId: receiverId, receiverId: senderId }
                ]
            })
            res.send({messages})
        
        } catch (error) {
            res.send({msg: 'something went wrong ', error: error.message})
        }
        })
        
        
        
        
        messageRouter.post('/new', async (req, res) => {
            try {
                const {senderId, receiverId, text,receiverSocketId} = req.body;
                const newMessage = new MessageModel({senderId, receiverId, text})
                await newMessage.save()
                
              
                io.to(receiverSocketId).emit('new-message', newMessage)

                res.send({msg: 'message sent', message: newMessage})
            } catch (error) {
                res.send({msg: 'something went wrong', error: error.message})
                
            }
        
        })
        
        return  messageRouter;
}

