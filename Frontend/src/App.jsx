import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoodDetector from './components/MoodDetector'
import MoodSongs from './components/MoodSongs'

function App() {

    const[songs,setSongs] =useState([])
  return (
    <>
      <MoodDetector setSongs={setSongs} />
      <MoodSongs Songs={songs}/>
    </>
  )
}

export default App
