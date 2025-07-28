// Portfolio app/src/components/About.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import garvitPic from '../images/garvit.png'; // Import your image here

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(imageRef.current, {
      x: -100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    })
    .fromTo(contentRef.current, {
      x: 100,
      opacity: 0
    }, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5');
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-100/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Passionate about creating digital experiences that matter
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Profile Image - Now filling the entire box */}
              <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl border border-primary-500/30 flex items-center justify-center backdrop-blur-sm overflow-hidden"> {/* Added overflow-hidden */}
                <img
                  src={garvitPic} // Use your imported image here
                  alt="Garvit Rai Profile" // Descriptive alt text
                  className="w-full h-full object-cover" // Made image fill its parent
                />
              </div>
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-secondary-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>
          </div>

          <div ref={contentRef} className="space-y-6">
            <h3 className="text-3xl font-bold text-white mb-6">
              Creating Digital Solutions as a B.Tech IT Student
            </h3>
            
            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                Hello! I'm Garvit Rai, a passionate third-year B.Tech IT student from SGSITS, Indore. My academic journey has provided me with a strong foundation in core computer science concepts, including Data Structures & Algorithms, Artificial Intelligence, and Software Engineering. I am driven by a deep curiosity for how technology shapes experiences and a love for crafting clean, efficient, and user-friendly applications.
              </p>
              
              <p>
                I specialize in modern web development, particularly with React, TypeScript, and Tailwind CSS. My expertise also spans Python, encompassing AI/ML applications using TensorFlow and OpenCV for object detection, and full-stack development with Python Flask. My recent academic trainee internship at KPMG India further honed my skills in enterprise-level integration with SAP systems and developing AI-powered solutions on SAP BTP.
              </p>
              
              <p>
                Whether it's building interactive web applications, delving into machine learning, or optimizing backend systems, I'm committed to continuous learning and staying at the forefront of technological advancements. I believe in transforming innovative ideas into tangible, high-quality digital products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-dark-50/50 p-4 rounded-lg border border-dark-200/30">
                <h4 className="text-primary-400 font-semibold mb-2">Academic & Internship Experience</h4>
                <p className="text-2xl font-bold text-white">3+ Years</p>
              </div>
              <div className="bg-dark-50/50 p-4 rounded-lg border border-dark-200/30">
                <h4 className="text-accent-400 font-semibold mb-2">Projects</h4>
                <p className="text-2xl font-bold text-white">8+ Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;