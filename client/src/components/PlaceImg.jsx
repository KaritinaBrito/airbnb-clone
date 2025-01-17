import React from 'react'

const PlaceImg = ({place, index=0, className=null}) => {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className = 'w-full rounded-2xl  object-cover'
    }

  return (
    <img className={className} src={'http://localhost:4000/uploads/'+place.photos[index]}/>
  )
}

export default PlaceImg