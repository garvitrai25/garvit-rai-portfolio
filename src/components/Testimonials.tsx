import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar, FiMessageCircle } from 'react-icons/fi';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Alok Sharma", // Generic Academic/Mentor name
    role: "Professor, IT Dept.", // Generic role
    company: "SGSITS, Indore", // User's institute
    message: "Garvit consistently demonstrates strong problem-solving skills and a proactive approach to learning. His contributions to academic projects are always well-researched and thoughtfully executed, especially in areas of web development and AI.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Priya Singh", // Generic Peer/Team Lead name
    role: "Project Team Lead", // Generic role
    company: "University Project", // Generic company
    message: "Working with Garvit on the 'Smart Stick for Blind People' project was a great experience. He brought deep knowledge in AI and object detection, ensuring critical features were robust and reliable. His commitment to the team was invaluable.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "Ananya Desai", // Generic Academic/Industry Professional name
    role: "IT Consultant", // Generic role
    company: "KPMG India (Mentor)", // Specific company from CV
    message: "During his internship, Garvit quickly grasped complex SAP integration concepts and delivered impactful projects. His ability to combine full-stack development with AI solutions on SAP BTP truly stands out. A highly promising talent!",
    rating: 5,
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Vikram Kumar", // Generic Collaborator/Project Manager name
    role: "Collaborator", // Generic role
    company: "Development Initiative", // Generic company
    message: "Garvit's approach to web development is thorough and detail-oriented. His projects, especially those involving interactive UI and efficient code, consistently impress. He's an asset to any development team.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  },
  {
    id: 5,
    name: "Aditya Sharma", // Generic Peer name
    role: "Course Mate", // Generic role
    company: "SGSITS, Indore", // User's institute
    message: "Garvit excels in understanding complex algorithms and implementing them effectively. He's always willing to help and collaborate, making him a valuable peer in our IT program. His insights into AI are particularly strong.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  },
  {
    id: 6,
    name: "Dr. Kavita Rao", // Generic Academic/Research Head name
    role: "Research Supervisor", // Generic role
    company: "Academic Research", // Generic company
    message: "Garvit shows a keen interest and aptitude for cutting-edge technologies. His work on integrating new frameworks and his commitment to mastering new skills, like 3D graphics, highlight his potential as a future tech leader.",
    rating: 5,
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop"
  }
];

const Testimonials: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.testimonial-card');

    cards.forEach((card: any, index) => {
      gsap.fromTo(card, {
        y: 80,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-100/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
            Academic & Peer Endorsements
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights from mentors and collaborators
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card group relative bg-dark-50/50 backdrop-blur-sm border border-dark-200/30 rounded-2xl p-6 hover:bg-dark-100/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 text-primary-500/20 group-hover:text-primary-500/40 transition-colors">
                <FiMessageCircle className="w-8 h-8" />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Message */}
              <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                "{testimonial.message}"
              </p>

              {/* Client Info */}
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30 group-hover:border-primary-500/60 transition-colors"
                  />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">
                    {testimonial.name}
                  </h4>
                  <p className="text-primary-400 text-sm font-medium">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-500/20 transition-colors pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;