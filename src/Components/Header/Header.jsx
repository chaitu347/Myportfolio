import ironman from "../../assets/iamronman.mp4";
import { useRef, useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true; // Ensure muted on load for autoplay
      video.play().catch((err) => {
        console.warn("Autoplay error:", err);
      });
    }
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const newMute = !isMuted;
      setIsMuted(newMute);
      video.muted = newMute;

      if (!newMute) {
        video.play().catch((err) =>
          console.warn("Playback error after unmuting:", err)
        );
      }
    }
  };

  return (
    <div className="video-wrapper ">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        playsInline
        muted
      >
        <source src={ironman} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="dark-overlay"></div>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? "🔇 Mute" : "🔊 Sound"}
      </button>
    </div>
  );
};

export default Header;
