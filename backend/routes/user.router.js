// const express = require('express');
// const { UserModel } = require('../models/usermodel');
import express from 'express'
import { UserModel } from '../models/usermodel.js';
const userRouter = express.Router();


userRouter.get('/', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json({users})
    } catch (error) {
        res.json({msg: 'something went wrong', error: error.message})
    }
})

userRouter.post('/create', async (req, res) => {
    try {
        const {name, currentSocket } = req.body;
        const user = await UserModel.findOneAndUpdate({name}, {currentSocket})
        if(user) {
            res.json({msg: {user:user , login: true}})
        }
        else {
            const newUser = UserModel({name, currentSocket});
            const x = await newUser.save();
            res.json({msg: {user: x, login: true}})
        }
    } catch (error) {
        res.json({msg:'something went wrong', error: error.message})
    }

})

userRouter.get('/delete', async (req, res) => {
    try {
        const x = await UserModel.deleteMany()
        res.json({msg: 'deleted', x })

    } catch (error) {
        res.json({msg: 'something went wrong', message: error.message})
        
    }
})

export default userRouter;