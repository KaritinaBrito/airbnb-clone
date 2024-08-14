import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';

const BookingSinglePage = () => {
  const [booking, setBooking]   = useState(null);
  const {id} = useParams();
    
    useEffect(() => { 
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({_id}) => _id === id);
        if(foundBooking){
          setBooking(foundBooking);
        }
      })
    }, [id])

    if(!booking){
      return '';
    }
  return (
    <div className='my-8'>
      <div className='flex gap-10 items-center'>
        <Link to={'/account/bookings'} className='p-2 shadow-md rounded-full '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className='text-3xl'>{booking.place.title}</h1>
      </div>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className='bg-gray-200 rounded-2xl p-6 mb-6 flex justify-between items-center'>
        <div>
          <h2 className='text-xl mb-2'>Your booking information: </h2>
          <BookingDates booking={booking}/>
        </div>
        <div className='bg-primary text-white p-6 rounded-2xl text-2xl'>
          <div>Total price</div>
          <div className='text-3xl'>${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place}/>
    </div>
  )
}

export default BookingSinglePage