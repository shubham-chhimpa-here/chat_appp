import express from 'express'
import  { MessageModel } from '../models/message.model.js';

const messageRouter = express.Router()

export default (io, onlineUsers) => {
    messageRouter.get('/all', async (req, res) => {
        try {
            // const {senderId, receiverId, text} = req.body;
            const messages = await MessageModel.find()
            res.json({messages})
        
        } catch (error) {
            res.json({msg: 'something went wrong ', error: error.message})
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
            res.json({messages})
        
        } catch (error) {
            res.json({msg: 'something went wrong ', error: error.message})
        }
        })
        
        
        
        
        messageRouter.post('/new', async (req, res) => {
            try {
                const {senderId, receiverId, text} = req.body;
                const newMessage = new MessageModel({senderId, receiverId, text})
                await newMessage.save()
                
              
                   // get receiver socket id from map
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('new-message', newMessage);
      }


                res.json({msg: 'message sent', message: newMessage})
            } catch (error) {
                res.json({msg: 'something went wrong', error: error.message})
                
            }
        
        })
        
        return  messageRouter;
}

