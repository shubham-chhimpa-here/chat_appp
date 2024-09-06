import  { model, Schema } from "mongoose";

const messageSchema = new Schema({
    senderId: {required: true, type: String},
    receiverId: {required: true, type: String},
    text: {required: true, type: String}
}, {
    timestamps: true
})

export const MessageModel = model('/message', messageSchema);