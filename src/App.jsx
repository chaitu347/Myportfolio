import { useState, useEffect } from 'react'
import './App.css'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Skills from './Components/Skills/Skills.jsx'
import Projects from './Components/Projects/Projects.jsx'

function App() {
  const [section, setSection] = useState('home');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Function to handle section navigation
    const handleSectionChange = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
      
      // Check which section is currently in view
      let currentSection = 'home';
      
      sections.forEach(sectionName => {
        const element = document.getElementById(sectionName);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isInView = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
          
          if (isInView) {
            currentSection = sectionName;
          }
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleSectionChange);
    
    // Listen for hash changes (navigation clicks)
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveSection(hash);
    });

    // Initial check
    handleSectionChange();

    return () => {
      window.removeEventListener('scroll', handleSectionChange);
      window.removeEventListener('hashchange', handleSectionChange);
    };
  }, [activeSection]);

  return (
    <div className="min-h-screen">
      <main className="transition-all duration-700">
        <Home isActiveSection={activeSection === 'home'} />
        <About />
        <Skills isActiveSection={activeSection === 'skills'} />
        <Projects isActiveSection={activeSection === 'projects'} />
        {/* Add other sections here as needed */}
      </main>
    </div>
  )
}

export default App