import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContent } from '../context/ContextProvider';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContent)


  return (
    <div style={{
      display: "flex",
      gap: '1rem',
      padding: '2rem',
    }}>


      {
        user && <Link to={'/'}>Home</Link>
      }
      <Link to={'/about'}>About</Link>
      <Link to={'/contact'}>Contact</Link>

{
  !user && <Link to={'/login'}>login</Link>
}
     


      {
        user && <div style={{
          position: 'fixed',
          top:'2rem',right: '2rem',
          background: '#ddd',
          padding:'.5rem'
        }}>

          <details>
  <summary> { user.name}</summary>
  <p><button onClick={() => {setUser(null)}} >logout</button></p>
</details>
        </div>
      }

    </div>
  )
}

export default Navbar;