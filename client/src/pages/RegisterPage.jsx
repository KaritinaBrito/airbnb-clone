import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(ev){
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name, email, password
      });
      alert('registration successful');
    } catch (error) {
      alert('Registration faild')
    }
   
  }
  return (
    <div className='mt-4 grow flex items-center justify-around'>
        <div className='mb-40'>
            <h1 className='text-4xl text-center mb-4'>Register</h1>
            <form className='max-w-md mx-auto' onSubmit={registerUser}>
                <input 
                  type='text' 
                  placeholder='John Doe' 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                />
                <input 
                  type='email' 
                  placeholder='your@mail.com'
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                />
                <input 
                  type='password' 
                  placeholder='password'
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                />
                <button className='primary'>Register</button>
                <div className='text-gray-500 text-center py-2'>
                    Already a member? <Link to={'/login'} className='text-black underline'>Login</Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterPage