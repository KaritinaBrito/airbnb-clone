import React, { useContext, useEffect, useState } from 'react';
import {differenceInCalendarDays} from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../USerContext';

const BookingWidget = ({place}) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name);
        }
    }, [])

    let numberOfNights = 0;
    
    if(checkIn && checkOut){
        numberOfNights= differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace(){
        const response = await axios.post('/bookings', {
            checkIn, 
            checkOut, 
            numberOfGuests, 
            name, 
            mobile,
            place:place._id,
            price:numberOfNights * place.price
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }


  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
        <p className='text-2xl text-center'>Price: ${place.price} / per night</p>
        <div className='border rounded-2xl mt-4'>
            <div className="grid grid-cols-2">
                <div className='py-3 px-4'>
                    <label>Check in:</label>
                    <input type="date"  value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className='py-3 px-4 border-l'>
                    <label>Check out:</label>
                    <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                </div>
            </div>
            <div className='py-3 px-4 border-t'>
                <label>Number of guests:</label>
                <input type="number" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)}/>
            </div>
            {numberOfNights > 0 && (
                <div className='py-3 px-4 border-t'>
                    <label>Your full name:</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                    <label>Phone number:</label>
                    <input type="tel" value={mobile} onChange={ev => setMobile(ev.target.value)}/>
                </div>
            )}
        </div>
        <button onClick={bookThisPlace} className='primary mt-4'>
            Book this place 
            {numberOfNights > 0 && (
                <span className='ml-2'>${numberOfNights * place.price}</span>
            )}
        </button>
    </div>
  )
}

export default BookingWidget