import { useState } from 'react'
import './App.css'
import MoodDetector from './components/MoodDetector'
import MoodSongs from './components/MoodSongs'
import MoodyHeading from './components/MoodyHeading'

function App() {

    const[songs,setSongs] =useState([])
  return (
    <>
      <MoodyHeading/>
      <MoodDetector setSongs={setSongs} />
      <MoodSongs Songs={songs}/>
    </>
  )
}

export default App
