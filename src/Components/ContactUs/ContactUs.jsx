import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io5";
import GradientText from "../About/GradientText";
import ContactForm from "./ContactForm.jsx";
import "./ContactUs.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

const ContactUs = ({ isActiveSection = false }) => {
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


const TypewriterEffect = ({ 
  text = "Welcome to our amazing website!", 
  speed = 100, 
  showCursor = false,
  className = "",
  onComplete = null 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [displayText, text, speed, onComplete]);
  return (
    <div className={`inline-block ${className}`}>
      <span className="">
        {displayText}
        {showCursor && <span className="ml-1 animate-pulse">|</span>}
      </span>
    </div>
  );
};



  return (
    <section ref={sectionRef} id="contact" className="contact-container h-dvh w-screen overflow-x-hidden stack">
       <div >
        {/* main container */}
         <div className={`projects-header ${isVisible ? 'fade-in' : ''}`}>
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center">
                   <GradientText
                                    colors={[
                                      "#b03a00",
                                      "#8000ff",
                                       "#4c00ff",
                                      "#f79d00",                                         
                                      "#e8b31e",
                                     
                                    ]}
                                    animationSpeed={5}
                                    showBorder={false}
                                    className="custom-class font-robert-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold"
                                  >
                                   CONTACT US
                                  </GradientText>
                  </h2>
        </div>
        <div>
            <ContactForm></ContactForm>
        </div>
      </div>
      
    </section>
  );
};

export default ContactUs;