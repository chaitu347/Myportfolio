import ironman from "../../assets/iamronman.mp4";
import React from 'react'
import ReactPlayer from 'react-player'
import "./Header.css";

/*const Header =()=>{
    return(
      <ReactPlayer url="https://res.cloudinary.com/dnbnst2wn/video/upload/v1747990859/xy7c2zzx7nap8sbs9x2g.mp4" playing = "true" loop = "true" />
    )
}*/
import React, { useRef, useState } from 'react';

const Header=() =>{
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={"/path-to-your-video.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={toggleMute} className="mute-button">
        {isMuted ? '🔇' : '🔊'}
      </button>
    </div>
  );
}

export default Header;