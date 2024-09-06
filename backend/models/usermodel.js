import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {required: true, type: String},
    currentSocket: {type: String}
},{
    timestamps: true
})

export const UserModel = model('user', userSchema);