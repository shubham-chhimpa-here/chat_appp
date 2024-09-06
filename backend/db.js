// const mongoose = require('mongoose')
import mongoose from 'mongoose'

export const connection = async (url) => {
    try {
        await mongoose.connect(url)
        console.log('connected to db')
        
    } catch (error) {
        console.log('something went wrong', error.message)
    }

}


