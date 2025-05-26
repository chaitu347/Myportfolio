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
    <section ref={sectionRef}  id="about" className="h-dvh w-screen overflow-x-hidden stack">
      <div className="stacking-section h-[100%] w-[100%] bg-[#000] flex flex-col xl:flex-row items-center justify-center">
        {/* left part */}
        <div className="brightness-50 order-1 md:order-2 w-[100%] h-[50%] lg:w-[50%] lg:h-[80%] sm:h-[90%] flex flex-col items-center justify-end">
          <img  src="https://res.cloudinary.com/dnbnst2wn/image/upload/v1748281650/photo_jkc3j1.jpg" alt="profilepic" />     
          
        </div>

        {/* right part */}
        <div className="order-2 ml-7 md:order-1 w-[100%] h-[50%] sm:w-[50%] sm:h-[100%] ">
          {/* main container */}
          
          <div className="h-full w-full p-5">
            {/* about me text */}
            <div className=" flex items-center justify-start h-[20%]">
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
                  className="custom-class font-robert-medium text-6xl sm:text-8xl font-bold"
                >
                  About Me
                </GradientText>
              </div>
            </div>

            {/* whole about me text */}
            <div className="flex-col items-start justify-start mt-10 h-[70%] pr-5">
              <p className="font-robert-medium text-sm sm:text-2xl text-metallic-gray" >
                Greetings! I'm{" "}
                <span className="text-blue-tint">Bhargav Kundrapu</span> a Digital Experience Architect who thrives on transforming wild ideas into interactive realities.
              </p><br/>
              <p className="font-robert-medium text-sm sm:text-2xl text-metallic-gray">
                I'm diving into the world of{" "}
                <span className="text-blue-tint">Artificial Intelligence</span>{" "}
                to add smarter features to websites. It's all about making web
                apps more helpful and responsive in simple ways.<br/><br/>
                <span className="text-blue-tint">My philosophy is simple-</span>{" "}
                every line of code should tell a story, every interaction should spark joy, and every application should feel less like software and more like magic. Whether I'm optimizing database queries at 2 AM or sketching wireframes over morning coffee, I'm always chasing that perfect moment when technology becomes invisible and user delight takes center stage.
                <br/><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <span className="text-white">-Bhargav Kundrapu </span>{" "}
                <br/><br/><br/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
