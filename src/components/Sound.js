import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function SoundPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const circleRef = useRef(null);
  let animation;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false)); 
    }
  }, [src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animation = gsap.to(circleRef.current, {
        duration: 1,
        repeat: -1,
        yoyo: true,
        scale: 1.2
      });
    } else {
      if (animation) {
        animation.kill();
      }
      gsap.to(circleRef.current, {
        duration: 0.5,
        scale: 1
      });
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <svg
        width="60"
        height="60"
        onClick={togglePlay}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          cursor: 'pointer',
        }}
      >
        <circle
          ref={circleRef}
          cx="30"
          cy="30"
          r="10"
          stroke="#007bff"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </>
  );
}