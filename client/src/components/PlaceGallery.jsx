import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos){
        return(
            <div className='absolute inset-0 bg-black text-white min-h-screen'>
                <div className='p-8 grid gap-4 bg-black justify-center'>
                    <div className='flex gap-4 relative items-center'>   
                        <div>
                            <button onClick={()=> setShowAllPhotos(false)} className='bg-white fixed p-2  rounded-full shadow-md shadow-gray-700 top-8 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                            </button>
                        </div>
                        <h2 className='text-3xl text-white pl-14'>Photos of {place.title}</h2>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                        <div>
                            <img src={'http://localhost:4000/uploads/'+photo} alt={index}/>
                        </div>
                    )) }
                </div>
            </div>
        );
    }
    
  return (
    <div className='relative'>
            <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden' >
                <div> 
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className=' cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos[0]} alt={place.title}/> 
                        </div>
                    )}
                </div>
                <div className='grid gap-2 '>
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className=' cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos[1]} alt={place.title}/> 
                    )}
                    <div className='overflow-hidden'>
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className=' cursor-pointer aspect-square object-cover' src={'http://localhost:4000/uploads/'+place.photos[2]} alt={place.title}/> 
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-4 px-4 bg-white rounded-2xl shadow-md shadow-gray-500'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Show more photos
            </button>
        </div>
  )
}

export default PlaceGallery