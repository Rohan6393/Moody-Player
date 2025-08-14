import React from "react";
import "./MoodSongs.css";
import CustomAudioPlayer from "./CustomAudioPlayer"; // renamed to our new styled player

const MoodSongs = ({ Songs }) => {
  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {Songs.length > 0 ? (
        Songs.map((song, index) => (
          <div className="Songs" key={index}>
            <CustomAudioPlayer
              song={{
                title: song.title,
                artist: song.artist,
                cover: song.cover, // make sure Songs array has a cover image
                audio: song.audio,
              }}
            />
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", opacity: 0.7 }}>
          No songs yet — click <b>Detect Face</b> to get recommendations.
        </p>
      )}
    </div>
  );
};

export default MoodSongs;
