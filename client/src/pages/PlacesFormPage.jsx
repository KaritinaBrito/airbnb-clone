import React, { useEffect, useState } from 'react'
import PhotosUploader from '../components/PhotosUploader';
import PerksLabel from '../components/PerksLabel';
import axios from 'axios';
import AccountNavigation from '../components/AccountNavigation';
import { Navigate, useParams } from 'react-router-dom';

const PlacesFormPage = () => {
    const {id} = useParams();
        console.log(id)
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);
    const [price, setPrice] = useState(100);
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response => {
            const {data} = response;
            console.log(data)
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id]);

    function intputHeader(text){
        return(
            <h2 className='text-2xl mt-4'>{text}</h2>
        );
    }
    function inputDescription(text){
        return(
            <p className='text-gray-500 text-sm'>{text}</p>
        );
    }
    function preInput(header, description){
        return (
            <>
                {intputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos, description, 
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        };
        if(id){
            //update
            await axios.put('/places/',  {
                 id, ...placeData
            });
            setRedirect(true);
        } else {
            await axios.post('/places',  placeData);
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/account/places'}/>
    }


  return (
    <div>
        <AccountNavigation/>
        <form className='py-3' onSubmit={savePlace}>
            {preInput('Title', 'Title for place, should be short and catchy as in  advertisement')}
            <input 
                value={title} 
                onChange={ev => setTitle(ev.target.value)} 
                type='text' 
                placeholder='Title, for example: My lovely appartament'
            />
            {preInput('Address', 'Address to this place')}
            <input 
                value={address} 
                onChange={ev => setAddress(ev.target.value)} 
                type='text' 
                placeholder='Address'
            />
            {preInput('Photos', 'more is better')}   
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description', 'description of the place')}
            <textarea 
                value={description} 
                onChange={ev => setDescription(ev.target.value)}
            />
            {preInput('Perks', 'select all the perks')}
            <div className='grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                <PerksLabel selected={perks} onChange={setPerks}/>
            </div>
            {preInput('Extra info', 'house rules, etc')}
            <textarea 
                value={extraInfo} 
                onChange={ev => setExtraInfo(ev.target.value)}
            />
            {preInput('Check in&out times, max guests', 'add check in and out yimes, remember to have some time window for cleaning the room between guests')}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                <div>
                    <h3 className='mt-2 -mb-1'>Check in time</h3>
                    <input 
                        value={checkIn} 
                        onChange={ev => setCheckIn(ev.target.value)} 
                        type="text" 
                        placeholder='14:00'
                    />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Check out time</h3>
                    <input 
                        value={checkOut} 
                        onChange={ev => setCheckOut(ev.target.value)} 
                        type="text" 
                        placeholder='13:00'
                    />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                    <input 
                        value={maxGuests} 
                        onChange={ev => setMaxGuests(ev.target.value)} 
                        type="number" 
                    />
                </div>
                <div>
                    <h3 className='mt-2 -mb-1'>Price per night</h3>
                    <input 
                        value={price} 
                        onChange={ev => setPrice(ev.target.value)} 
                        type="number" 
                    />
                </div>
            </div>
            <div>
                <button className='primary my-4'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default PlacesFormPage