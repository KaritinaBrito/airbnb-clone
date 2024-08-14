import React, { useContext, useState } from 'react'
import { UserContext } from '../USerContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNavigation from '../components/AccountNavigation';

const ProfilePage = () => {
  const {ready, user, setUser} = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let {subpage} = useParams();
  if(subpage === undefined){
    subpage = 'profile';
  }

  function logout(){
    axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }

  if(!ready){
    return 'Loading...';
  }
  if(ready && !user && !redirect){
    return <Navigate to={'/login'} />
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }
  return (
    <div>
      <AccountNavigation/>
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto'>
          Logged in as {user.name}, {user.email}
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage/>
      )}
    </div>
  );
}

export default ProfilePage;