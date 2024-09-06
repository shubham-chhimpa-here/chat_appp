import React, { createContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';

export const AuthContent = createContext()


export let socket;

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [currentSocket, setCurrentSocket] = useState("")

    const obj = {
        user, setUser, currentSocket
    }


    useEffect(() => {

        socket = io('http://localhost:8080')

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('hello', (arr) => {
            console.log(arr)
            setCurrentSocket(arr)
        })
        return () => {
            socket.disconnect()
        }
    }, [])


    return (
        <AuthContent.Provider value={obj}>
            {children}
        </AuthContent.Provider>
    )
}

export default AuthContextProvider;