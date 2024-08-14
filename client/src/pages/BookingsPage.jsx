import React, { useEffect, useState } from 'react'
import AccountNavigation from '../components/AccountNavigation'
import axios from 'axios'
import PlaceImg from '../components/PlaceImg';
import { differenceInCalendarDays, format } from 'date-fns';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);
  return (
    <div>
        <AccountNavigation/>
        <div>
            {bookings?.length > 0 && bookings.map(booking => (
                <Link to={`/account/bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-4'>
                    <div className='w-48'>
                        <PlaceImg place={booking.place}/>
                    </div>
                    <div className='py-3 pr-3 grow'>
                        <h2 className='text-xl'>{booking.place.title}</h2>                        
                    <div className='text-xl'>
                        <div className='flex gap-1 mb-2 text-gray-500'>
                            <div className='text-xl'>
                                <BookingDates booking={booking} className='text-gray-500 text-sm mb-2 mt-4'/>
                            </div>
                        </div>
                        <div className='flex gap-1 items-center text-xl '>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>                            
                            <p>Total price: ${booking.price}</p>
                        </div>
                    </div>
                    </div>
                </Link>
        ))}
        </div>
    </div>
  )
}

export default BookingsPage