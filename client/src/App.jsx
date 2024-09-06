import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { MainCom } from './components/MainCom'
import AllRoutes from './components/AllRoutes'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <Navbar />
    <AllRoutes />
   
    </>
  )
}

export default App;
