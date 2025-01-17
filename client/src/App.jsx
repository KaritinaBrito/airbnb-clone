import {Routes, Route} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './USerContext';
import ProfilePage from './pages/AccountPage';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlaceSinglePage from './pages/PlaceSinglePage';
import BookingsPage from './pages/BookingsPage';
import BookingSinglePage from './pages/BookingSinglePage';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/account/:subpage?' element={<ProfilePage/>}/>
          <Route path='/account/places' element={<PlacesPage/>}/>
          <Route path='/account/places/new' element={<PlacesFormPage/>}/>
          <Route path='/account/places/:id' element={<PlacesFormPage/>}/>
          <Route path='/place/:id' element={<PlaceSinglePage/>}/>
          <Route path='/account/bookings' element={<BookingsPage />}/>
          <Route path='/account/bookings/:id' element={<BookingSinglePage />}/>
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
