import ironman from "../../assets/iamronman.mp4";
import { useRef, useState, useEffect } from 'react';
import "./Header.css";

const Header = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        playsInline
      >
        <source src={ironman} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? '🔇 Mute' : '🔊 Sound'}
      </button>
    </div>
  );
};

export default Header;
