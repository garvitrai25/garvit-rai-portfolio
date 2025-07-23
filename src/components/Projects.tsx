import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiExternalLink, FiGithub, FiPlayCircle } from 'react-icons/fi';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Chatbot Assistant",
    description: "Intelligent chatbot for SAP systems with real-time data fetching.",
    longDescription: "Developed an intelligent, responsive chatbot using SAP AI Core (OpenAI GPT-4o) and Python Flask. Integrated with SAP systems for real-time data fetching (PO and Invoices via ZINV_STATUS_SRV OData service) and implemented multi-API support (OpenWeatherMap, timeapi.io) with intent recognition and stateful dialogue. Deployed on SAP Business Technology Platform (BTP) Cloud Foundry.",
    image: "../images/chatbot.jpg", // Corrected image path
    technologies: ["SAP AI Core (GPT-4o)", "Python Flask", "SAP Gateway OData", "React", "TypeScript", "Tailwind CSS", "SAP BTP"],
    liveUrl: "https://flask-chatbot.cfapps.in30.hana.ondemand.com/",
    githubUrl: "https://github.com/garvitrai25",
    category: "AI/ML & Enterprise",
    featured: true
  },
  {
    id: 2,
    title: "Vendor Onboarding Portal",
    description: "Full-stack system for supplier registration and approval with SAP integration.",
    longDescription: "Designed and developed a full-stack supplier registration and approval system. Features include multi-step vendor registration, a supplier management dashboard, and an approval workflow system. It utilizes real-time SAP OData integration with SUP_PRTL_VNB_ONBD_SRV service. Built with React, TypeScript, Vite, Tailwind CSS, and Python Flask, deployed on SAP BTP Cloud Foundry.",
    image: "../images/vendor.jpg", // Corrected image path
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Python Flask", "SAP BTP Cloud Foundry"],
    liveUrl: "https://vendor-onboarding-portal-proud-tiger-sz.cfapps.in30.hana.ondemand.com/",
    githubUrl: "https://github.com/garvitrai25",
    category: "Web App & Enterprise",
    featured: true
  },
  {
    id: 3,
    title: "Smart Stick for Blind People",
    description: "AI-powered smart stick for visually impaired with object detection.",
    longDescription: "Developed a smart stick with a camera and object detection system for visually impaired individuals. Provides real-time detection of 5-8 common objects with audio feedback. Technologies: Python, OpenCV, TensorFlow, YOLO Object Detection Models. Features live camera feed processing, real-time audio alerts, and a portable design.",
    image: "https://via.placeholder.com/800x450/667eea/ffffff?text=Smart+Stick+AI", // Placeholder image
    technologies: ["Python", "OpenCV", "TensorFlow", "YOLO"],
    liveUrl: "#", // Replace with actual live demo URL if available
    githubUrl: "https://github.com/garvitrai25", // Example GitHub link
    category: "AI/ML",
    featured: true
  },
  {
    id: 4,
    title: "Farm Machinery Rental Platform",
    description: "Location-based web platform for farm machinery rental and sales.",
    longDescription: "Currently developing a location-based web platform for farm machinery rental and sales. Includes an equipment suggestion system based on farmers' requirements. This is a full-stack project in development.",
    image: "https://via.placeholder.com/800x450/48bb78/ffffff?text=Farm+Platform", // Placeholder image
    technologies: ["React", "Node.js", "MongoDB", "Express"], // Example technologies, adjust as per your actual tech stack for this project
    liveUrl: "#", // Update when live
    githubUrl: "https://github.com/garvitrai25", // Example GitHub link
    category: "Full Stack Web App",
    featured: false
  },
  {
    id: 5,
    title: "SAP S/4HANA Technical Documentation",
    description: "Formal Technical Specification Documents for custom Fiori applications.",
    longDescription: "Prepared formal Technical Specification Documents (TSDs) for custom Fiori applications focused on Procurement and Vendor Collaboration scope within SAP S/4HANA. Deliverables included 3 finalized TSDs with custom code snippets (JavaScript, XML), SAPUI5 logic, role checks, and business explanations.",
    image: "https://via.placeholder.com/800x450/ed64a6/ffffff?text=SAP+Documentation", // Placeholder image
    technologies: ["SAPUI5", "JavaScript", "XML", "Technical Documentation"],
    liveUrl: "#", // Not applicable for documentation, use "#" or remove
    githubUrl: "https://github.com/garvitrai25/SAP-S4HANA-TSD", // Example GitHub link
    category: "Technical Documentation",
    featured: false
  },
  {
    id: 6,
    title: "Italian Restaurant Website",
    description: "Elegantly designed website showcasing menu and ambiance.",
    longDescription: "An elegantly designed restaurant website showcasing its menu and ambiance. Developed using HTML and CSS, with a strong focus on visual appeal and a user-friendly interface.",
    image: "https://via.placeholder.com/800x450/9f7aea/ffffff?text=Restaurant+Site", // Placeholder image
    technologies: ["HTML", "CSS"],
    liveUrl: "#", // Replace with actual live demo URL if available
    githubUrl: "https://github.com/garvitrai25", // Example GitHub link
    category: "Web Design",
    featured: false
  },
  {
    id: 7,
    title: "Drum Kit Web Application",
    description: "Interactive drum kit with keyboard and click-based sound generation.",
    longDescription: "An interactive drum kit web application allowing sound generation via keyboard presses and mouse clicks. Built with HTML, CSS, and JavaScript, featuring event handling and responsive design.",
    image: "https://via.placeholder.com/800x450/4fd1c5/ffffff?text=Drum+Kit+App", // Placeholder image
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#", // Replace with actual live demo URL if available
    githubUrl: "https://github.com/garvitrai25", // Example GitHub link
    category: "Web App",
    featured: false
  },
  {
    id: 8,
    title: "Dice Challenge Game",
    description: "Simple web game with random dice rolls for two players.",
    longDescription: "A simple web-based game featuring random dice rolls for two players. Built using HTML, CSS, and JavaScript (utilizing querySelector for DOM manipulation). Includes features for random generation and winner determination.",
    image: "https://via.placeholder.com/800x450/fc8181/ffffff?text=Dice+Game", // Placeholder image
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "#", // Replace with actual live demo URL if available
    githubUrl: "https://github.com/garvitrai25", // Example GitHub link
    category: "Web Game",
    featured: false
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.project-card');

    cards.forEach((card: any, index) => {
      gsap.fromTo(card, {
        y: 100,
        opacity: 0,
        rotationX: 45
      }, {
        y: 0,
        opacity: 1,
        rotationX: 0,
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectId: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      duration: 0.3,
      rotationX: rotateX,
      rotationY: rotateY,
      transformPerspective: 1000,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      duration: 0.3,
      rotationX: 0,
      rotationY: 0,
      ease: 'power2.out'
    });
  };

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work and creative solutions
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`project-card group relative bg-dark-100/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl overflow-hidden hover:bg-dark-100/70 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20 ${
                project.featured ? 'lg:col-span-2' : ''
              }`}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredProject(project.id)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-50 via-transparent to-transparent opacity-60"></div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {project.category}
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent-500/80 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    Featured
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiPlayCircle className="w-16 h-16 text-white transform scale-75 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {hoveredProject === project.id ? project.longDescription : project.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-dark-200/30 text-gray-300 rounded-md text-xs font-medium border border-dark-200/50 group-hover:border-primary-500/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    <FiExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-200/50 hover:bg-dark-200/70 text-gray-300 hover:text-white rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;