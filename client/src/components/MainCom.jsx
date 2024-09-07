import React, { useContext, useEffect, useState } from 'react'
import { AuthContent, socket } from '../context/ContextProvider'
export const MainCom = () => {
  const [users, setUsers] = useState(null)
  const [messages, setMessages] = useState([])
  const [receiver, setReceiver] = useState(null)
  const [newMe, setNewMe] = useState("")
  const { user } = useContext(AuthContent)


  const [text, setText] = useState('')

  const getMessages = () => {
    const url = `/api/message`
    fetch(url,
      {
        method: 'post',
        body: JSON.stringify({ senderId: user._id, receiverId: receiver._id }),
        headers: {
          'content-type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        // console.log(res)
        setMessages(res.messages)
      })
      .catch(e => { console.log(e) })
  }


  socket.on('new-message', (arr) => {
    // console.log(arr)
    setNewMe(arr)
  })


  useEffect(() => {
    // console.log(newMe.senderId , receiver._id)
    if (newMe.senderId == receiver?._id) {
      setMessages(state => [...state, newMe])

    }
  }, [newMe])

  const getUsers = () => {
    const url = `/api/user`
    fetch(url)
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(res => {
        // console.log(res)
        setUsers(res.users)
      })
      .catch(e => { console.log(e) })
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    if (!receiver) return
    getMessages()
  }, [receiver])

  const handleSubmit = (e) => {
    if (!receiver) return

    e.preventDefault();
    const url = `/api/message/new`
    fetch(url, {
      method: 'post',
      body: JSON.stringify({ text, senderId: user._id, receiverId: receiver._id, receiverSocketId: receiver.currentSocket }),
      headers: {
        'content-type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(res => {
        // console.log(res) 
        if (res.message)
          setMessages(state => [...state, res.message])
      })
      .catch(e => { console.log(e) })
      .finally(() => {
        setText("")
      })

  }

  return (
    <div className='' style={{
      height: '80dvh',
      display: 'flex',
      width: '100%',
      border: '1px solid red'

    }}>
      <aside className='border h-full p-8 flex-1' style={{
        overflow: 'auto'

      }}>
        {
          users?.map((user, index) => {
            return <div key={index} style={{
              border: '1px solid black',
              padding: '1rem',
              marginBlock: '5px',
              width: '200px'
            }}>
              <button onClick={() => { setReceiver(user) }}>{user.name}</button>
            </div>
          })
        }
      </aside>
      <main className='border h-full flex-1 overflow-auto ' style={{
        position: 'relative'
      }} >
        {
         messages && messages.length > 0 && (messages?.map((message, index) => {
            return <div key={index} style={{
              border: '1px solid black',
              padding: '1rem',
              marginBlock: '5px',
              width: 'fit-content',
              marginLeft: `${message.senderId == user._id && 'auto'}`
            }}>
              <p>
                {message.text}
              </p>
            </div>
          }))
        }

        <div className='border-4' style={{
          height: '80px', width: '50%', position: 'fixed', top: '0px',
          padding: '1rem',
          display: 'flex',

        }}>

          <form onSubmit={handleSubmit} style={{

          }}>
            <input type="text" value={text} className='border' onChange={(e) => setText(e.target.value)} />
            <button type="submit">send message to {receiver?.name}</button>
          </form>

        </div>
      </main>
    </div>
  )
}
