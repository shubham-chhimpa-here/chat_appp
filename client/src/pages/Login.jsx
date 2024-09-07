import React, { useContext, useEffect, useState } from 'react'
import { AuthContent } from '../context/ContextProvider'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const {user, setUser, currentSocket} = useContext(AuthContent)
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = '/api/user/create'
        fetch(url, {
            method: 'post',
            body: JSON.stringify({name, currentSocket}),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => { console.log(res) 
                setUser(res.msg.user)
               
            })
            .catch(e => { console.log(e) })
            .finally(() => {
                setName("")
            })
    }
  
    useEffect(() => {
        if(user) navigate('/')
    }, [user])
    return (
        <div>
            <form onSubmit={handleSubmit} style={{
                display:'flex',
                flexDirection:'column',
                gap:'1rem',
                border:'1px solid black'
            }}>
                <input type="text" className='border' value={name} required name="name" id="" onChange={(e) => setName(e.target.value)} />
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;