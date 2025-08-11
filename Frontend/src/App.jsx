import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MoodDetector from './components/MoodDetector'
import MoodSongs from './components/MoodSongs'

function App() {

    const[Songs,setSongs] =useState([
        {
            title:"Song1",
            artist:"Artist1",
            url:"https://example.com/song1.mp3",
        },
        {
            title:"Song2",
            artist:"Artist2",
            url:"https://example.com/song2.mp3",
        },
        {
            title:"Song3",
            artist:"Artist3",
            url:"https://example.com/song3.mp3",
        },
        {
            title:"Song4",
            artist:"Artist4",
            url:"https://example.com/song4.mp3",
        },
        {
            title:"Song5",
            artist:"Artist5",
            url:"https://example.com/song5.mp3",
        }
    ])
  return (
    <>
      <MoodDetector setSongs={setSongs} />
      <MoodSongs Songs={Songs}/>
    </>
  )
}

export default App
