import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";
import Carousel from "./Carousel"; // Import your Carousel component
import GradientText from "../About/GradientText";
import "./Projects.css";
import "../../App.css";

gsap.registerPlugin(ScrollTrigger);

// DynamicTypewriter Component
const DynamicTypewriter = ({
  sentences = [
    "Welcome to our amazing website!"
  ],
  finalSentence = "",
  typeSpeed = 100,
  deleteSpeed = 2,
  pauseTime = 2000,
  cycleCount = 1,
  comebackDelay = 3000,
  className = "typewriter-text",
  isVisible = true,
  isPaused = false // Pause control
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [completedSentences, setCompletedSentences] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [phase, setPhase] = useState('initial');
  const [componentVisible, setComponentVisible] = useState(false);
  
  // NEW: Simplified timing approach
  const animationStateRef = useRef({
    timeoutId: null,
    isPaused: false
  });

  useEffect(() => {
    if (isVisible) {
      setComponentVisible(true);
    }
  }, [isVisible]);

  // NEW: Handle pause/resume
  useEffect(() => {
    animationStateRef.current.isPaused = isPaused;
    
    if (isPaused && animationStateRef.current.timeoutId) {
      clearTimeout(animationStateRef.current.timeoutId);
      animationStateRef.current.timeoutId = null;
    } else if (!isPaused && componentVisible && (phase === 'initial' || phase === 'comeback')) {
      // Resume animation
      animateText();
    }
  }, [isPaused]);

  const animateText = () => {
    if (animationStateRef.current.isPaused) return;
    if (!componentVisible && phase !== 'waiting') return;

    const currentSentence = phase === 'comeback' ? finalSentence : sentences[currentIndex];
    
    if (isDeleting) {
      setDisplayText(currentSentence.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentSentence.substring(0, displayText.length + 1));
    }

    let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && displayText === currentSentence) {
      // Finished typing
      if (phase === 'comeback') {
        // Final sentence typed, wait then disappear permanently
        nextDelay = pauseTime * 2;
        animationStateRef.current.timeoutId = setTimeout(() => {
          if (animationStateRef.current.isPaused) return;
          setShowCursor(true);
          setTimeout(() => {
            if (animationStateRef.current.isPaused) return;
            setComponentVisible(false);
          }, 500);
        }, nextDelay);
        return;
      } else {
        // Start deleting after pause
        nextDelay = pauseTime;
        animationStateRef.current.timeoutId = setTimeout(() => {
          if (animationStateRef.current.isPaused) return;
          setIsDeleting(true);
          animateText();
        }, nextDelay);
        return;
      }
    } else if (isDeleting && displayText === '') {
      // Finished deleting current sentence
      if (phase === 'initial') {
        const newCompletedCount = completedSentences + 1;
        setCompletedSentences(newCompletedCount);
        
        // Check if we've completed all required sentences
        const totalSentencesNeeded = sentences.length * cycleCount;
        if (newCompletedCount >= totalSentencesNeeded) {
          // All cycles completed, disappear and prepare for comeback
          setShowCursor(true);
          setTimeout(() => {
            if (animationStateRef.current.isPaused) return;
            setComponentVisible(false);
            setPhase('waiting');
            
            // Comeback after delay
            setTimeout(() => {
              if (animationStateRef.current.isPaused) return;
              setPhase('comeback');
              setComponentVisible(true);
              setShowCursor(false);
              setDisplayText('');
              animateText();
            }, comebackDelay);
          }, 500);
          return;
        }
        
        // Move to next sentence
        const nextIndex = (currentIndex + 1) % sentences.length;
        setCurrentIndex(nextIndex);
      }
      
      setIsDeleting(false);
      nextDelay = 500;
    }

    animationStateRef.current.timeoutId = setTimeout(() => {
      if (!animationStateRef.current.isPaused) {
        animateText();
      }
    }, nextDelay);
  };

  useEffect(() => {
    if (componentVisible && !animationStateRef.current.isPaused && (phase === 'initial' || phase === 'comeback')) {
      const timeoutId = setTimeout(animateText, typeSpeed);
      animationStateRef.current.timeoutId = timeoutId;
    }

    return () => {
      if (animationStateRef.current.timeoutId) {
        clearTimeout(animationStateRef.current.timeoutId);
        animationStateRef.current.timeoutId = null;
      }
    };
  }, [componentVisible, phase, currentIndex, displayText, isDeleting, completedSentences]);

  if (!componentVisible) return null;

  return (
    <div className={`inline-block ${className}`}>
      <span className="font-robert-small font-bold text-6xl text-[#2aafff] ">
        {displayText}
        
      </span>
    </div>
  );
};

const Projects = ({ isActiveSection = false }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [sectionRef, isInView] = useIntersectionObserver();
  const [key, setKey] = useState(0);
  
  // NEW: Simpler timing approach using refs
  const sectionActiveTimeRef = useRef(0); // Total time section has been active
  const lastActiveStartRef = useRef(null); // When current active session started
  const intervalRef = useRef(null);
  const visibilityTimeoutRef = useRef(null);
  const carouselTimeoutRef = useRef(null);
  
  // Animation thresholds
  const VISIBILITY_THRESHOLD = 434;
  const CAROUSEL_THRESHOLD = 15437;

  // NEW: Function to update accumulated time and check thresholds
  const updateTiming = () => {
    if (lastActiveStartRef.current) {
      const sessionTime = Date.now() - lastActiveStartRef.current;
      const totalTime = sectionActiveTimeRef.current + sessionTime;
      
      // Check visibility threshold
      if (!isVisible && totalTime >= VISIBILITY_THRESHOLD) {
        setIsVisible(true);
      }
      
      // Check carousel threshold
      if (!showCarousel && totalTime >= CAROUSEL_THRESHOLD) {
        setShowCarousel(true);
      }
    }
  };

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

    // NEW: Handle timing with continuous tracking
    if (isActiveSection) {
      // Starting or resuming active session
      if (!lastActiveStartRef.current) {
        lastActiveStartRef.current = Date.now();
      }
      
      // Start interval to check timing thresholds
      intervalRef.current = setInterval(updateTiming, 100); // Check every 100ms
      
      // Immediate check in case thresholds are already met
      updateTiming();
      
    } else {
      // Section becoming inactive
      if (lastActiveStartRef.current) {
        // Add current session time to total accumulated time
        const sessionTime = Date.now() - lastActiveStartRef.current;
        sectionActiveTimeRef.current += sessionTime;
        lastActiveStartRef.current = null;
      }
      
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      // Clear any pending timeouts
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
        visibilityTimeoutRef.current = null;
      }
      if (carouselTimeoutRef.current) {
        clearTimeout(carouselTimeoutRef.current);
        carouselTimeoutRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      if (carouselTimeoutRef.current) {
        clearTimeout(carouselTimeoutRef.current);
      }
    };
  }, [isMuted, isActiveSection, isVisible, showCarousel]); // NEW: Updated dependencies

  const toggleMute = () => {
    const video = videoRef.current;
    if (video && isActiveSection) {
      setIsMuted(!isMuted);
      video.muted = !isMuted;
    }
  };

  const restartDemo = () => {
    setKey(prev => prev + 1);
    // NEW: Reset all timing and state
    sectionActiveTimeRef.current = 0;
    lastActiveStartRef.current = null;
    setIsVisible(false);
    setShowCarousel(false);
    
    // Clear any running timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  return (
    <section ref={sectionRef} id="projects" className="skills-container stack min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 transition-all duration-1000">
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
            <source src="https://res.cloudinary.com/dnbnst2wn/video/upload/v1748263479/v3_gd8jnj.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradient Overlays */}
          <div className="gradient-overlay-left"></div>
          <div className="gradient-overlay-top"></div>
        </div>

        {/* Projects Title */}
        <div className={`projects-header ${isVisible ? 'fade-in' : ''}`}>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 text-center">
           <GradientText
                            colors={[
                              "#b03a00",
                              "#8000ff",
                              "#f79d00",                                         
                              "#e8b31e",
                              
                              "#4c00ff",
                            ]}
                            animationSpeed={5}
                            showBorder={false}
                            className="custom-class font-robert-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold"
                          >
                           PROJECTS
                          </GradientText>
          </h2>
        </div>

        {/* Dynamic Typewriter Demo */}
        <div className="flex flex-row items-center justify-between">
        <div className="h-20 flex-col items-center justify-start w-1/3 pr-8 pl-8">
          <DynamicTypewriter 
            key={key}
            sentences={[
              
              "Please hold while my portfolio does something cooler than a loading spinner",
            ]}
            finalSentence=""
            typeSpeed={80}
            deleteSpeed={2}
            pauseTime={1500}
            cycleCount={1}
            comebackDelay={2000}
            className="typewriter-text"
            isVisible={isVisible}
            isPaused={!isActiveSection} // NEW: Pass pause state
          />
        </div>
        

        {/* Carousel Component - Only renders after specified time */}
        {showCarousel && (
          <div className="carousel-container carousel-slide-left pl-5 w-2/3 relative z-10 px-8 pb-8">
            <Carousel />
          </div>
        )}
        </div>

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

        {/* Restart Demo Button (optional) */}
       
      </div>
    </section>
  );
};

export default Projects;