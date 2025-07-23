import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiTwitter, FiSend } from 'react-icons/fi';
import ContactScene from './3D/ContactScene';

// Import Firebase functions from your firebase.ts file
import { db, collection, addDoc, serverTimestamp } from '../firebase';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(''); // State to hold feedback message
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>(''); // State for message type (success/error)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.contact-form', {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    })
    .fromTo('.contact-info', {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to display feedback message
  const showFeedbackMessage = (message: string, type: 'success' | 'error') => {
    setSubmitMessage(message);
    setMessageType(type);
    gsap.to('.feedback-message', { // Use a common class for the feedback message div
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out'
    });

    setTimeout(() => {
      gsap.to('.feedback-message', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power3.out'
      });
      // Clear message after animation
      setTimeout(() => {
        setSubmitMessage('');
        setMessageType('');
      }, 500); // Allow animation to finish before clearing
    }, 3000); // Message visible for 3 seconds
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(''); // Clear any previous feedback messages

    try {
      // Add a new document to the 'messages' collection in Firestore
      await addDoc(collection(db, "messages"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: serverTimestamp() // Add a server-generated timestamp
      });

      showFeedbackMessage('Message sent successfully!', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form
    } catch (error) {
      console.error("Error sending message: ", error);
      showFeedbackMessage('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-100/30 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
              <ContactScene />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can bring your ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="bg-dark-50/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-100/50 border border-dark-200/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-100/50 border border-dark-200/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-dark-100/50 border border-dark-200/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="Project discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-100/50 border border-dark-200/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:scale-100 hover:shadow-xl hover:shadow-primary-500/25 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Feedback Message (Success/Error) */}
              {submitMessage && (
                <div className={`feedback-message fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg opacity-0 transform translate-y-[-20px] z-50 ${
                  messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white`}>
                  <p className="font-medium">{submitMessage}</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="contact-info space-y-8">
            <div className="bg-dark-50/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center">
                    <FiMail className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-300">Garvitrai25@gmail.com</p> {/* Updated email */}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center">
                    <FiPhone className="w-6 h-6 text-accent-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-300">+91 7000021916</p> {/* Updated phone */}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                    <FiMapPin className="w-6 h-6 text-secondary-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-300">Indore, India</p> {/* Updated location */}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-dark-50/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Follow Me</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://github.com/garvitrai25" // Updated GitHub link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark-200/30 hover:bg-primary-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                >
                  <FiGithub className="w-6 h-6 text-gray-400 group-hover:text-primary-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/garvit-rai-11b3b0250/" // Updated LinkedIn link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark-200/30 hover:bg-primary-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                >
                  <FiLinkedin className="w-6 h-6 text-gray-400 group-hover:text-primary-400" />
                </a>
                <a
                  href="https://twitter.com/your-twitter-handle" // Placeholder: Update with your actual Twitter handle if you have one
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-dark-200/30 hover:bg-primary-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                >
                  <FiTwitter className="w-6 h-6 text-gray-400 group-hover:text-primary-400" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/30 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-white font-semibold">Available for new projects</p>
              </div>
              <p className="text-gray-300 text-sm">
                I'm currently accepting new freelance projects and collaborations.
                Let's discuss how we can work together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
