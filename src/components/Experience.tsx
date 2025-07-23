import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "TE-SAP Academic Trainee (Internship)",
    company: "KPMG India",
    location: "Virtual/Remote", // You can update this to a specific city if applicable
    period: "June 2025 – July 2025",
    description: "Successfully delivered three comprehensive projects demonstrating enterprise-level integration capabilities with SAP systems. Gained hands-on experience in full-stack development, AI implementation, and technical documentation, all deployed on SAP Business Technology Platform (BTP) using modern web technologies and cloud-native architectures.",
    technologies: ["SAP AI Core (OpenAI GPT-4o)", "Python Flask", "SAP Gateway OData", "React", "TypeScript", "Tailwind CSS", "SAP BTP Cloud Foundry"]
  },
  {
    id: 2,
    title: "B.Tech in Information Technology",
    company: "Shri G.S. Institute of Technology & Science (SGSITS)",
    location: "Indore, India",
    period: "2022 - Present (Expected 2026)",
    description: "Currently pursuing a Bachelor of Technology degree with a strong academic focus on Data Structures & Algorithms, Artificial Intelligence, Software Engineering, and Computer Networks. Maintained a current CGPA of 7.62.",
    technologies: ["C++", "C", "Java", "Python", "HTML", "CSS", "JavaScript"]
  }
  // You can add more academic achievements or relevant coursework here if you want to expand
];

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const items = gsap.utils.toArray('.timeline-item');

    items.forEach((item: any, index) => {
      gsap.fromTo(item, {
        x: index % 2 === 0 ? -100 : 100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Animate timeline line
    gsap.fromTo('.timeline-line', {
      scaleY: 0
    }, {
      scaleY: 1,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            My Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional growth and achievements
          </p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-accent-500 origin-top"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`timeline-item flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1 px-8">
                  <div className={`bg-dark-100/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-6 hover:bg-dark-100/70 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 ${
                    index % 2 === 0 ? 'mr-8' : 'ml-8'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-primary-400 font-semibold mb-2">
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <div className="flex items-center mb-1">
                          <FiCalendar className="w-4 h-4 mr-1" />
                          {exp.period}
                        </div>
                        <div className="flex items-center">
                          <FiMapPin className="w-4 h-4 mr-1" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium border border-primary-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-10">
                  <div className="w-4 h-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full border-4 border-dark-50 shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full animate-ping opacity-20"></div>
                  </div>
                </div>

                <div className="flex-1 px-8">
                  {/* Empty space for alternating layout */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;