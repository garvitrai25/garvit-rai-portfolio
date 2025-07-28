import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { FiDownload, FiArrowDown } from 'react-icons/fi';
import WorkspaceScene from './3D/WorkspaceScene';
import ParticleSystem from './3D/ParticleSystem';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(titleRef.current, {
      y: 50,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    })
    .fromTo(subtitleRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .fromTo(ctaRef.current, {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.3');

    // Typing effect for the title
    const titleText = "Hi, I'm Garvit Rai, A Web Developer"; // Updated with your name
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.textContent = '';
      let i = 0;
      const typeWriter = () => {
        if (i < titleText.length) {
          titleElement.textContent += titleText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        }
      };
      setTimeout(typeWriter, 1500);
    }
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
            <ParticleSystem />
            <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
              <WorkspaceScene />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-accent-300 bg-clip-text text-transparent leading-tight"
        >
          {/* Text will be filled by typewriter effect */}
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Crafting innovative digital solutions with a focus on full-stack development, AI implementation, and immersive web experiences. Let's build something impactful together. {/* Updated tagline */}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToProjects}
            className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25 flex items-center space-x-2"
          >
            <span>View My Work</span>
            <FiArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
          
          <button className="group bg-dark-100/20 backdrop-blur-sm hover:bg-dark-100/30 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 border border-dark-200/30 hover:border-primary-400/50 flex items-center space-x-2">
            <FiDownload className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span><a href="https://drive.google.com/file/d/18TdYfciZgCE6zhfiH5sjA9Rw05uDVLYl/view?usp=sharing" target="blank">Download CV</a></span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;