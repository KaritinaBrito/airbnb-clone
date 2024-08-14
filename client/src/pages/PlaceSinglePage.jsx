import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';

const PlaceSinglePage = () => {
    const [place, setPlace] = useState(null);
    const {id} =  useParams();

    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if(!place) return '';

  return (
    <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'> 
        <h1 className='text-2xl'>{place.title}</h1>
       <AddressLink>{place.address}</AddressLink>
        <PlaceGallery place={place}/>
        
        <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
            <div>
                <div className='my-4'>
                    <h2 className='font-semibold text-2xl'>Description:</h2>
                    {place.description}
                </div>
                <p>Check-in: {place.checkIn}</p>
                <p>Check-out: {place.checkOut}</p>
                <p>Max number of guests: {place.maxGuests}</p>
            </div>
            <div>
               <BookingWidget place={place}/>
            </div>
        </div>
        <div className='bg-white -mx-8 px-8 py-8 border-t'>
            <h2 className='font-semibold text-2xl'>Extra info:</h2>
            <div className='text-sm text-gray-700 leading-5 mb-4 mt-2'>{place.extraInfo}</div>
        </div>
    </div>
  )
}

export default PlaceSinglePage