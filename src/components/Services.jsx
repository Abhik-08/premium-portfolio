import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 100
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 0.8
    }
  }
};

const ProjectCard = ({ title, subtitle, techStack, points, icon, githubUrl, liveUrl }) => {
  return (
    <motion.article
      whileHover={{
        y: -6,
        scale: 1.02
      }}
      transition={{
        duration: 0.25
      }}
      className="group relative flex flex-col justify-between rounded-[2.5rem] bg-white/[0.13] hover:bg-white/[0.18] backdrop-blur-2xl border border-white/30 hover:border-white/50 shadow-[0_15px_35px_rgba(0,0,0,0.18)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.32)] transition-all duration-500 p-10 h-full z-10 w-full"
      aria-label={`Project: ${title}`}
    >
      {/* Decorative top glass gradient line */}
      <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

      {/* Card Header */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Icon Wrapper */}
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/25 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#ff2a2a] transition-all duration-500 shadow-sm group-hover:shadow-[0_10px_20px_rgba(255,255,255,0.25)]">
            {icon}
          </div>
          {/* Top category/subtitle */}
          <span className="text-xs font-bold tracking-[0.25em] text-white/85 uppercase font-mono group-hover:text-white transition-colors duration-300">
            {subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-black text-white tracking-tight mb-5 leading-tight">
          {title}
        </h3>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 group-hover:border-transparent group-hover:bg-white group-hover:text-[#ff2a2a] transition-all duration-500"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bullet Points List */}
        <ul className="space-y-4">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3.5">
              {/* Custom Red Arrow/Checkmark SVG */}
              <span className="mt-1 shrink-0 text-white/90 group-hover:text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <p className="text-[15px] font-semibold leading-relaxed text-white/85 group-hover:text-white transition-colors duration-500">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer Actions */}
      <div className="mt-8 pt-6 border-t border-white/15 flex items-center justify-between gap-4">
        {/* Source Code Ghost Button */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-bold text-white/85 hover:text-white hover:scale-105 transition-all duration-300 focus:outline-none"
          aria-label={`View source code for ${title}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
          </svg>
          Source Code
        </a>

        {/* Live Demo Premium Button */}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-white text-[#ff2a2a] font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-500 shadow-md hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)] focus:outline-none"
            aria-label={`View live demo of ${title}`}
          >
            Live Demo
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
  points: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.node.isRequired,
  githubUrl: PropTypes.string.isRequired,
  liveUrl: PropTypes.string
};

const Services = () => {
  const projects = [
    {
      title: "AI-Powered Online Examination Platform",
      subtitle: "CLOUD-NATIVE EXAM PLATFORM",
      techStack: ["React", "Node.js", "Convex Cloud", "WebRTC"],
      githubUrl: "https://github.com/Abhik-08/online-exam-system",
      liveUrl: "https://online-exam-system-gamma.vercel.app/",
      delay: 0.08,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      points: [
        "Built a cloud-native examination platform enabling instructors to create and manage exams while providing students secure access through unique exam links and automated grading workflows.",
        "Implemented real-time webcam-based proctoring with violation tracking, automatic submission logic, and centralized monitoring dashboards, significantly reducing malpractice opportunities."
      ]
    },
    {
      title: "CollabHub Real-Time Collaboration Suite",
      subtitle: "REAL-TIME COLLABORATION SYSTEM",
      techStack: ["HTML", "CSS", "Node.js", "Socket.IO", "MongoDB"],
      githubUrl: "https://github.com/Abhik-08/CollabHub",
      liveUrl: "https://collabhub-in.vercel.app/",
      delay: 0.16,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
      points: [
        "Developed a unified collaboration workspace integrating real-time code sharing, collaborative whiteboards, flowchart creation, file sharing, and AI-assisted group communication.",
        "Engineered multi-user synchronization using Socket.IO and MongoDB, ensuring low-latency collaboration and persistent storage of workspace assets, shared files, and chat history."
      ]
    },
    {
      title: "AbhiSwaad AI Food Ordering Platform",
      subtitle: "AI FOOD PLATFORM",
      techStack: ["Java", "Spring Boot", "Spring AI", "Supabase"],
      githubUrl: "https://github.com/Abhik-08/AbhiSwaad",
      liveUrl: null,
      delay: 0.24,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
      points: [
        "Built a full-stack food ordering platform supporting restaurant discovery, cart management, coupon application, order processing, and automated PDF invoice generation.",
        "Integrated Spring AI-powered recommendation capabilities and Supabase-backed data management for users, orders, restaurants, and inventory with secure session handling."
      ]
    },
    {
      title: "Student Management & Academic Analytics Platform",
      subtitle: "ACADEMIC ANALYTICS WORKSPACE",
      techStack: ["React", "TypeScript", "Spring Boot", "Firebase", "Firestore"],
      githubUrl: "https://github.com/Abhik-08/CODSOFT",
      liveUrl: "https://student-management-system-abhik.vercel.app/",
      delay: 0.32,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      points: [
        "Developed a full-stack academic management platform featuring student registration, profile management, multi-semester academic tracking, attendance monitoring, grade analysis, and portfolio generation.",
        "Implemented Firebase Authentication, role-based access control, Firestore integration, academic risk detection, AI-powered academic insights, and analytics dashboards for data-driven student performance monitoring."
      ]
    },
    {
      title: "Smart ATM Banking System",
      subtitle: "ENTERPRISE BANKING PLATFORM",
      techStack: ["React", "Java", "Spring Boot", "REST APIs"],
      githubUrl: "https://github.com/Abhik-08/CODSOFT",
      liveUrl: "https://atm-interface-t4.vercel.app/",
      delay: 0.4,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75-3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V14" />
        </svg>
      ),
      points: [
        "Built a modern ATM management application supporting secure account operations including deposits, withdrawals, balance inquiry, transaction validation, and transaction history management.",
        "Designed a responsive banking dashboard with real-time balance updates, RESTful backend services, input validation, and seamless frontend-backend integration using React and Spring Boot."
      ]
    },
    {
      title: "Uber Business Intelligence & Ride Analytics Dashboard",
      subtitle: "UBER RIDE ANALYTICS",
      techStack: ["Tableau", "Data Visualization", "Excel", "Data Analytics"],
      githubUrl: "https://github.com/Abhik-08/Uber-Tableau",
      liveUrl: "https://public.tableau.com/app/profile/abhik.mukherjee4381/viz/UberDashboard_17745510068850/Dashboard1?publish=yes",
      delay: 0.48,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      points: [
        "Built an end-to-end Tableau analytics solution on 148,770 Uber ride records, delivering interactive insights into booking trends, revenue performance, ride distances, peak-hour demand, customer behavior, and cancellation analytics.",
        "Created executive KPI dashboards, location-based revenue analysis, fare-versus-distance visualizations, fleet performance metrics, and customer experience insights to support data-driven business optimization and strategic decision-making."
      ]
    }
  ];

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-[#4c0519] via-[#ff2a2a] to-[#3f0712] pt-36 pb-44 px-6 md:px-12 w-full relative overflow-hidden font-sans"
    >
      {/* Torn paper divider at top transitioning from white Skills section to red Projects section */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-30 transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Background radial glowing elements for deep red theme */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-[150px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Header Content */}
        <motion.div 
          variants={itemVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 border border-white/20 bg-white/10 rounded-full px-5 py-1.5 text-xs text-white font-bold mb-6 shadow-sm uppercase tracking-wider hover:border-white/40 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Projects &amp; Creations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.15] mb-6 tracking-tight">
            Featured Technical Work &amp; Scalable Systems
          </h2>
          <p className="text-red-100 text-base md:text-lg font-medium leading-relaxed">
            A selection of full-stack platforms, real-time collaboration engines, and enterprise web solutions demonstrating performance, security, and exceptional user interfaces.
          </p>
        </motion.div>

        {/* Responsive Flex Wrap Layout for perfect center alignment of the odd-numbered cards */}
        <motion.div variants={containerVariants} className="flex flex-wrap justify-center items-stretch gap-8 w-full">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[440px] flex flex-col items-stretch"
            >
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                techStack={project.techStack}
                points={project.points}
                icon={project.icon}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </motion.div>
          ))}
        </motion.div>

      </motion.div>

      {/* Torn paper divider at bottom transitioning from red Projects section to light Certifications section */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Decorative stars */}
      <div className="absolute top-28 right-10 md:right-20 text-black/15 animate-pulse pointer-events-none">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </div>
      <div className="absolute bottom-40 left-4 md:left-20 text-black/15 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}>
        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0l2.5 8.5L23 12l-8.5 2.5L12 23l-2.5-8.5L1 12l8.5-2.5z" /></svg>
      </div>
    </section>
  );
};

export default Services;
