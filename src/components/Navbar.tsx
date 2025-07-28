import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import { gsap } from 'gsap';
import { FiHome, FiUser, FiBriefcase, FiCode, FiFolder, FiMessageSquare, FiMusic, FiMenu, FiX } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Create a ref for the audio element
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const navItems = [
    { name: 'Home', href: '#hero', icon: FiHome },
    { name: 'About', href: '#about', icon: FiUser },
    { name: 'Experience', href: '#experience', icon: FiBriefcase },
    { name: 'Skills', href: '#skills', icon: FiCode },
    { name: 'Projects', href: '#projects', icon: FiFolder },
    { name: 'Contact', href: '#contact', icon: FiMessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo('.navbar', {
      y: -100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5
    });
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          // Autoplay policy might block playback without user interaction first.
          // This catch handles that.
          console.error("Autoplay failed:", error);
          alert("Autoplay blocked. Please interact with the page first to play music.");
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? 'bg-dark-50/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Garvit Rai's Portfolio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-100/50 transition-all duration-200 group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Music Toggle & Mobile Menu Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-full transition-all duration-200 ${
                isMusicPlaying
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-100/50 text-gray-300 hover:text-white'
              }`}
            >
              <FiMusic className={`w-5 h-5 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-dark-100/50 transition-all duration-200"
            >
              {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-50/95 backdrop-blur-md border-t border-dark-100/20">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-100/50 transition-all duration-200"
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
            <button
              onClick={toggleMusic}
              className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                isMusicPlaying
                  ? 'text-primary-400'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <FiMusic className={`w-5 h-5 ${isMusicPlaying ? 'animate-pulse' : ''}`} />
              <span>{isMusicPlaying ? 'Pause Music' : 'Play Music'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Audio element for playback */}
      <audio ref={audioRef} loop>
        {/* Updated the src attribute with the correct path and filename */}
        <source src="/audio/space-ambient-351305.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </nav>
  );
};

export default Navbar;
