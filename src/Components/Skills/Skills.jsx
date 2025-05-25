import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import "./Skills.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

const Skills = ({ isActiveSection = false }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [sectionRef, isInView] = useIntersectionObserver();

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      if (isActiveSection) {
        // Section is active - play and respect mute state
        video.muted = isMuted;
        video.play().catch((err) => {
          console.warn("Autoplay issue:", err);
        });
      } else {
        // Section is not active - pause and mute
        video.pause();
        video.muted = true;
        setIsMuted(true); // Reset mute state
      }
    }

    // Start animations after component mounts
    if (isActiveSection) {
      setTimeout(() => setIsVisible(true), 300);
    } else {
      setIsVisible(false);
    }
  }, [isMuted, isActiveSection]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video && isActiveSection) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="skills-container stack min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 transition-all duration-1000">
      <div>
        
        

        {/* Video Background */}
        <div className={`video-wrapper ${isInView ? 'fade-in' : ''}`}>
          <video
            ref={videoRef}
            className="background-video"
            autoPlay={isActiveSection}
            loop
            playsInline
            muted={isMuted}
          >
            <source src="https://res.cloudinary.com/dnbnst2wn/video/upload/v1748091379/Untitled_video_-_Made_with_Clipchamp_4_yacutu.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlays */}
          <div className="gradient-overlay-left"></div>
          <div className="gradient-overlay-top"></div>
        </div>

        {/* Skills Content */}
        

        {/* Mute/Unmute Button */}
        <button
          className={`mute-button ${isVisible ? 'button-appear' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          disabled={!isActiveSection}
        >
          {isMuted ? (
            <svg className="mute-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.816a1 1 0 011.617.816zM15.657 8.343a.5.5 0 01.707.707L14.707 10l1.657 1.657a.5.5 0 01-.707.707L14 10.707l-1.657 1.657a.5.5 0 01-.707-.707L13.293 10l-1.657-1.657a.5.5 0 01.707-.707L14 9.293l1.657-1.657z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="unmute-icon" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.776L4.146 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.146l4.237-3.776a1 1 0 011.617.776z" clipRule="evenodd" />
              <path d="M11.199 5.199a.75.75 0 011.06 0A4.5 4.5 0 0114.5 10a4.5 4.5 0 01-2.241 3.901.75.75 0 11-.821-1.258A3 3 0 0013.5 10a3 3 0 00-2.062-2.643.75.75 0 010-1.158z" />
              <path d="M15.199 3.199a.75.75 0 011.06 0A8.5 8.5 0 0118.5 10a8.5 8.5 0 01-2.241 5.801.75.75 0 11-1.06-1.06A7 7 0 0017.5 10a7 7 0 00-2.301-5.199.75.75 0 010-1.06z" />
            </svg>
          )}
        </button>

        {/* Floating Particles */}
        <div className="particles-container">
          <div className={`particle particle-1 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-2 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-3 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-4 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-5 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-6 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-7 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-8 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-9 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-10 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-11 ${isVisible ? 'particle-animate' : ''}`}></div>
          <div className={`particle particle-12 ${isVisible ? 'particle-animate' : ''}`}></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;