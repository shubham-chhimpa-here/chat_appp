import React, { useContext } from 'react'
import { MainCom } from '../components/MainCom';
import { AuthContent } from '../context/ContextProvider';
import { Link, redirect } from 'react-router-dom';

const Home = () => {
  const {user} = useContext(AuthContent)
 
  return (
    <div>
      {
        user ? <MainCom /> : <h1>login first <Link to={'/login'}> click here </Link> </h1>       }
     
    </div>
  )
}

export default Home;