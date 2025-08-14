import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaHeart, FaRandom, FaRedo, FaVolumeUp, FaShareAlt, FaPlus } from "react-icons/fa";
import "./CustomPlayer.css";

const CustomAudioPlayer = ({ song }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  return (
    <div className="custom-player">
      <audio ref={audioRef} src={song.audio}></audio>

      <div className="controls-left">
        <button><FaStepBackward /></button>
        <button onClick={togglePlayPause} className="play-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button><FaStepForward /></button>
      </div>

      <img src={song.cover} alt="cover" className="cover-art" />

      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>

      <div className="progress-bar">
        <span>{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="controls-right">
        <FaHeart />
        <FaShareAlt />
        <FaPlus />
        <FaRandom />
        <FaRedo />
        <FaVolumeUp />
      </div>
    </div>
  );
};

const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default CustomAudioPlayer;
