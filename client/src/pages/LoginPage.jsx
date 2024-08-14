import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../USerContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev){
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email, password});
      setUser(data);
      alert('Login successful')      
      setRedirect(true);
    } catch (error) {
      alert('Login failed');
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-40'>
            <h1 className='text-4xl text-center mb-4'>Login</h1>
            <form className='max-w-md mx-auto' onSubmit={handleLoginSubmit}>
                <input 
                  type='email' 
                  placeholder='your@mail.com'  
                  value={email} 
                  onChange={ev => setEmail(ev.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='password' 
                  value={password} 
                  onChange={ev => setPassword(ev.target.value)}
                />
                <button className='primary'>Login</button>
                <div className='text-gray-500 text-center py-2'>
                    Don't have an account yet? <Link to={'/register'} className='text-black underline'>Register</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage