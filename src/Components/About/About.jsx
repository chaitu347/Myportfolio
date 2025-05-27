import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import BlurText from "./BlurText.jsx";
import GradientText from "./GradientText";
import "./About.css";
import { useIntersectionObserver } from "../useIntersectionObserver.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  return (
    <section ref={sectionRef} id="about" className="min-h-screen w-screen overflow-x-hidden stack">
      <div className="stacking-section min-h-screen w-full bg-[#000] flex flex-col lg:flex-row items-center justify-center py-8 lg:py-0">
        {/* left part */}
        <div className="brightness-50 order-1 lg:order-1 w-full h-64 sm:h-80 md:h-96 lg:w-1/2 lg:h-4/5 flex flex-col items-center justify-center lg:justify-end px-4">
          <img 
            src="https://res.cloudinary.com/dnbnst2wn/image/upload/v1748281650/photo_jkc3j1.jpg" 
            alt="profilepic" 
            className="max-w-full max-h-full object-contain"
          />                        
        </div>

        {/* right part */}
        <div className="order-2 lg:order-2 w-full lg:w-1/2 px-4 sm:px-6 lg:px-8 py-4 lg:py-0">
          {/* main container */}                     
          <div className="h-full w-full">
            {/* about me text */}
            <div className="flex items-center justify-start mb-6 lg:mb-8">
              <div>
                <GradientText
                  colors={[
                    "#4c00ff",
                    "#8000ff",
                    "#f79d00",                                         
                    "#e8b31e",
                    "#b03a00",
                  ]}
                  animationSpeed={9}
                  showBorder={false}
                  className="custom-class font-robert-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
                >
                  About Me
                </GradientText>
              </div>
            </div>

            {/* whole about me text */}
            <div className="flex-col items-start justify-start space-y-4 sm:space-y-6">
              <p className="font-robert-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-metallic-gray leading-relaxed">
                Greetings! I'm{" "}
                <span className="text-blue-tint">Bhargav Kundrapu</span> a Digital Experience Architect who thrives on transforming wild ideas into interactive realities.
              </p>

              <p className="font-robert-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-metallic-gray leading-relaxed">
                I'm diving into the world of{" "}
                <span className="text-blue-tint">Artificial Intelligence</span>{" "}
                to add smarter features to websites. It's all about making web
                apps more helpful and responsive in simple ways.
              </p>

              <p className="font-robert-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-metallic-gray leading-relaxed">
                <span className="text-blue-tint">My philosophy is simple-</span>{" "}
                every line of code should tell a story, every interaction should spark joy, and every application should feel less like software and more like magic. Whether I'm optimizing database queries at 2 AM or sketching wireframes over morning coffee, I'm always chasing that perfect moment when technology becomes invisible and user delight takes center stage.
              </p>

              <div className="flex justify-center sm:justify-end pt-4">
                <span className="font-robert-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white">
                  -Bhargav Kundrapu
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;