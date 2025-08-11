// src/components/MoodDetector.js
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import moodToSongs from "../moodSongs";
import "./MoodDetector.css";
import axios from "axios";

const MoodDetector = ({ setSongs }) => {
  const videoRef = useRef(null);

  const [currentMood, setCurrentMood] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    }; // Load face-api.js models

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((err) => console.error("Camera error: ", err));
    };

    loadModels();
  }, []);

  const detectMood = async () => {
    const video = videoRef.current;

    if (!video || video.paused || video.ended) {
      console.log("No face detected or video not playing");
      return;
    }

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const mood = Object.entries(expressions).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];

      if (mood !== currentMood) {
        setCurrentMood(mood);

        // 🔹 Fetch songs immediately using the new mood (not old state)
        axios
          .get(`http://localhost:3000/songs?mood=${mood}`)
          .then((response) => {
            console.log(response.data);
            setSongs(response.data?.songs || []);
          })
          .catch((err) => console.error(err));
      }
    }
  };

  return (
    <div className="mood-element">
      <h2 className="text-xl font-bold mb-4">Mood: {currentMood}</h2>
      <video ref={videoRef} autoPlay muted className="user-video-feed" />

      <button onClick={detectMood}>Detect Face</button>
    </div>
  );
};

export default MoodDetector;
