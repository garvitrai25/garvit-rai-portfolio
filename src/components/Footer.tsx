import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-50 border-t border-dark-200/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              Garvit Rai
            </h3> {/* Updated to your name */}
            <p className="text-gray-400 max-w-md">
              A passionate B.Tech IT student specializing in full-stack web development, AI, and creating impactful digital experiences with modern technologies.
            </p> {/* Updated description */}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-primary-400 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.querySelector(link.href);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <a
                href="mailto:Garvitrai25@gmail.com"
                className="flex items-center space-x-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
              >
                <FiMail className="w-4 h-4" />
                <span>Garvitrai25@gmail.com</span> {/* Updated email */}
              </a>
              <p className="text-gray-400">Indore, India</p> {/* Updated location */}
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-dark-200/30 pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Follow me:</span>
            <div className="flex space-x-3">
              {[
                { icon: FiGithub, href: 'https://github.com/garvitrai25', label: 'GitHub' }, // Updated GitHub link
                { icon: FiLinkedin, href: 'https://www.linkedin.com/in/garvit-rai-11b3b0250/', label: 'LinkedIn' }, // Updated LinkedIn link
                { icon: FiTwitter, href: 'https://twitter.com/your-twitter-handle', label: 'Twitter' } // Placeholder: Update with your actual Twitter handle
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-dark-100/50 hover:bg-primary-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group border border-dark-200/30 hover:border-primary-500/50"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-primary-400" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 text-gray-400">
            <span>© {currentYear} Garvit Rai. Made with</span> {/* Updated name */}
            <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and lots of code</span> {/* Adjusted ending */}
          </div>
        </div>

        {/* Tech Stack Credits */}
        <div className="mt-4 pt-4 border-t border-dark-200/30">
          <p className="text-center text-xs text-gray-500">
            Built with React, Three.js, GSAP, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;