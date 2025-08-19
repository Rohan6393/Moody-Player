import React, { useRef, useState, useEffect } from "react";
// Icons for player controls
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import "./CustomPlayer.css";

const CustomAudioPlayer = ({ song }) => {
  // Reference to <audio> tag to control it programmatically
  const audioRef = useRef(null);

  // Player state variables
  const [isPlaying, setIsPlaying] = useState(false); // Play/Pause status
  const [currentTime, setCurrentTime] = useState(0); // Current playback time
  const [duration, setDuration] = useState(0); // Song duration
  const [volume, setVolume] = useState(1); // Volume (0 to 1)
  const [isMuted, setIsMuted] = useState(false); // Mute status

  // Runs only once when the component mounts
  useEffect(() => {
    if (audioRef.current) {
      // When song's metadata (like duration) is loaded
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current.duration);
      });

      // Update `currentTime` while the song is playing
      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }
  }, []);

  // Play/Pause handler
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause song
    } else {
      audioRef.current.play(); // Play song
    }
    setIsPlaying(!isPlaying); // Toggle state
  };

  // Seek to a specific point in the song
  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  // Mute/Unmute handler
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume; // Restore volume
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0; // Mute
      setIsMuted(true);
    }
  };

  // Volume change handler
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === "0");
  };

  return (
    <div className="custom-player">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={song.audio}></audio>

      {/* Left controls: Prev, Play/Pause, Next */}
      <div className="controls-left">
        <button><FaStepBackward /></button>
        <button onClick={togglePlayPause} className="play-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button><FaStepForward /></button>
      </div>

      {/* Song title & artist */}
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
      </div>

      {/* Progress bar */}
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

      {/* Volume controls */}
      <div className="controls-right">
        <button onClick={toggleMute}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

// Helper to convert seconds → MM:SS format
const formatTime = (time) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default CustomAudioPlayer;
