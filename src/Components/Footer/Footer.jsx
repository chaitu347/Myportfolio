import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import "./Footer.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = ({ isActiveSection = false }) => {
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

  const Footer = () => {
    const video = videoRef.current;
    if (video && isActiveSection) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };

  return (
    <section ref={sectionRef} id="footer" className="skills-container stack min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 transition-all duration-1000">
      <div>
      <img src="https://res.cloudinary.com/dnbnst2wn/image/upload/v1748269848/32399-3840x2160-desktop-4k-avengers-wallpaper_o7akut.jpg" alt="footer-image"  />
      <div className="gradient-overlay-left-footer"></div>
      <div className="gradient-overlay-top-footer"></div>
      </div>
    </section>
  );
};

export default Footer;