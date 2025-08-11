import React, { useState } from 'react'
import "./MoodSongs.css"
const MoodSongs = ({Songs}) => {



  return (
    <div className='mood-songs'>
        <h2>Recommended Songs</h2>
        {Songs.map((song,index)=>(
            <div className='Songs' key={index} >
                <div className="title">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                </div>
                <div className='play-pause-button'>
               <i className="ri-pause-fill"></i>
               <i className="ri-play-circle-fill"></i>
                </div>
            </div>
        ))}
    </div>
  )
}

export default MoodSongs