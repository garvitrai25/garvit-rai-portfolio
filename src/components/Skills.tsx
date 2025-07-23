import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCard3D from './3D/SkillCard3D';
import {
  FiCode,
  FiLayers,
  FiDatabase, // Can be used for DBMS
  FiCloud,
  FiTool,
  FiShare2 // Good for Computer Networks
} from 'react-icons/fi';

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  icon: React.ElementType;
  color: string;
  technologies: string[];
}

const skills: Skill[] = [
  {
    id: 1,
    name: "Web Development",
    category: "Frontend & Full-stack",
    level: 90,
    icon: FiCode,
    color: "#0ea5e9", // Primary blue
    technologies: ["React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Vite", "Python Flask", "SAPUI5 Logic"]
  },
  {
    id: 2,
    name: "Programming Languages",
    category: "Core & Backend",
    level: 85,
    icon: FiLayers,
    color: "#10b981", // Secondary green
    technologies: ["Python", "C++", "C", "Java"]
  },
  {
    id: 3,
    name: "AI & Machine Learning",
    category: "Specialization",
    level: 80,
    icon: FiDatabase, // Using FiDatabase as a generic representation for data/AI
    color: "#f59e0b", // Accent orange
    technologies: ["TensorFlow", "YOLO Object Detection Models", "OpenCV", "SAP AI Core (OpenAI GPT-4o)"]
  },
  {
    id: 4,
    name: "Database Management", // New Skill Category
    category: "Data & Systems",
    level: 75, // Medium proficiency
    icon: FiDatabase, // Reusing FiDatabase for DBMS
    color: "#ef4444", // Red color for this category
    technologies: ["MongoDB", "MySQL", "PostgreSQL", "SQL"] // Added MongoDB and other common DBMS
  },
  {
    id: 5,
    name: "Computer Networks", // New Skill Category
    category: "Core IT",
    level: 70, // Medium proficiency
    icon: FiShare2, // Represents connectivity/networks
    color: "#8b5cf6", // Purple
    technologies: ["TCP/IP", "HTTP/HTTPS", "DNS", "Routing", "Networking Protocols"] // Common networking concepts
  },
  {
    id: 6,
    name: "Cloud & Enterprise Systems",
    category: "Platform & Tools",
    level: 75,
    icon: FiCloud,
    color: "#d946ef", // Another accent color
    technologies: ["SAP Business Technology Platform (BTP)", "SAP Gateway OData", "Visual Studio", "Cisco Packet Tracer"]
  },
  {
    id: 7,
    name: "Operating Systems",
    category: "Foundational",
    level: 95,
    icon: FiTool,
    color: "#06b6d4", // Cyan color
    technologies: ["Windows", "Linux", "macOS"]
  }
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.skill-card');

    gsap.fromTo(cards, {
      y: 100,
      opacity: 0,
      scale: 0.8
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-100/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="skill-card group relative bg-dark-50/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-6 hover:bg-dark-100/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:scale-105"
            >
              {/* 3D Icon Background */}
              <div className="absolute inset-0 h-32 overflow-hidden rounded-t-2xl">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                      <SkillCard3D color={skill.color} />
                    </Float>
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
                  </Suspense>
                </Canvas>
              </div>

              {/* Card Content */}
              <div className="relative z-10 pt-24">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r from-[${skill.color}] to-[${skill.color}]20 mr-4`} style={{background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}40)`}}>
                    <skill.icon className="w-6 h-6" style={{color: skill.color}} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-400">{skill.category}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Proficiency</span>
                    <span className="text-white font-semibold">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-dark-200/30 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r transition-all duration-1000 delay-300"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                        width: `${skill.level}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <p className="text-sm text-gray-400 font-medium">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-dark-200/30 text-gray-300 rounded-md text-xs font-medium border border-dark-200/50 hover:border-primary-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;