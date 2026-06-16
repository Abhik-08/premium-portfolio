import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles/expertise.css';

// Import Certificate Images
import msmeCert from '../assets/certificates/msme.jpg';
import springCert from '../assets/certificates/udemy_spring.png';
import awsCert from '../assets/certificates/udemy_aws.png';
import genaiCert from '../assets/certificates/coursera_genai.png';
import pythonPart1Cert from '../assets/certificates/infosys_python_part1.png';
import pythonCert from '../assets/certificates/infosys_python.png';
import pythonBasicsCert from '../assets/certificates/infosys_python_basics.png';
import aicteCert from '../assets/certificates/aicte_bootcamp.png';
import gdgCert from '../assets/certificates/gdg_hackathon.png';

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

const CertificationCard = ({ title, provider, description, url, icon, image }) => {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{
        y: -6,
        scale: 1.02
      }}
      transition={{
        duration: 0.25
      }}
      className="group relative flex flex-col justify-between rounded-[2.5rem] bg-gradient-to-b from-white to-red-500/[0.01] hover:to-red-500/[0.05] border border-[#ff2a2a]/10 hover:border-[#ff2a2a]/40 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(255,42,42,0.12)] transition-all duration-500 p-8 h-full z-10 w-full overflow-hidden"
      aria-label={`Certification: ${title}`}
    >
      {/* Thicker red laser accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-t-[2.5rem]"></div>

      {/* Subtle glowing red spotlight at bottom right */}
      <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-[#ff2a2a]/6 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Card Content */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Icon Wrapper */}
          <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-200/70 flex items-center justify-center text-slate-700 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-transparent transition-all duration-500 shadow-sm">
            {icon}
          </div>
          {/* Platform/Provider */}
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#ff2a2a] uppercase font-mono bg-red-500/5 px-3 py-1 rounded-full border border-red-500/10">
            {provider}
          </span>
        </div>

        {/* Certificate Preview Image */}
        {image && (
          <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-slate-150 shadow-inner group-hover:border-[#ff2a2a]/20 transition-all duration-500">
            <img
              src={image}
              alt={`Certificate for ${title}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-4 group-hover:text-[#ff2a2a] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm font-medium leading-relaxed text-slate-500 group-hover:text-slate-650 transition-colors duration-500">
          {description}
        </p>
      </div>

      {/* Verify Link - Premium outline pill button */}
      <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-start">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-600 hover:bg-[#ff2a2a] hover:text-white hover:border-transparent hover:shadow-[0_8px_20px_rgba(255,42,42,0.25)] hover:scale-105 transition-all duration-300 focus:outline-none group/btn"
          aria-label={`Verify credential for ${title}`}
        >
          <span>Verify Credential</span>
          <svg className="w-3.5 h-3.5 text-[#ff2a2a] group-hover:text-white transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </motion.article>
  );
};

CertificationCard.propTypes = {
  title: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  image: PropTypes.string
};

CertificationCard.defaultProps = {
  image: null
};

const Certifications = () => {
  const certs = [
    {
      title: "Entrepreneurship-cum-Skill Development Programme (E-SDP) – Data Analytics",
      provider: "MSME, GOVT OF INDIA",
      url: "https://drive.google.com/file/d/1Yc7xCFmWbbok2ENHjPBT_9p6k62nsHS7/view?usp=sharing",
      description: "Successfully completed an intensive Data Analytics training program organized by MSME (CTTC Bhubaneswar), covering data-driven decision making, business intelligence, and analytical problem-solving methodologies. Gained hands-on experience with Advanced Excel, Tableau, data visualization techniques, dashboard creation, and real-world analytics workflows.",
      image: msmeCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
      )
    },
    {
      title: "Spring Framework for Java Developers: Practical Guide",
      provider: "Udemy",
      url: "https://drive.google.com/file/d/1HwvTHc5lkJ5acKETg8LQg9tfA-xYOK8z/view?usp=sharing",
      description: "Completed comprehensive training on Spring Framework fundamentals, dependency injection, Spring MVC, Spring Boot architecture, REST API development, and enterprise application design. Strengthened backend development expertise through practical implementation of scalable Java applications.",
      image: springCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: "AWS & React: Deploy an Auto-Scaling E-Commerce Application",
      provider: "Udemy",
      url: "https://drive.google.com/file/d/1KY0B2QXy6TdTQ4Jk5knhAlg9w51p9NTM/view?usp=sharing",
      description: "Learned cloud-native deployment strategies using AWS services, load balancing, auto-scaling concepts, and production-grade React application deployment workflows. Explored modern DevOps practices for building scalable, highly available web applications on cloud infrastructure.",
      image: awsCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    },
    {
      title: "Introduction to Generative AI",
      provider: "Google Cloud × Coursera",
      url: "https://drive.google.com/file/d/19CBOyxhwpdqMpdwPVPospFXwXX27y93F/view?usp=sharing",
      description: "Completed foundational training on Generative AI, Large Language Models (LLMs), prompt engineering, responsible AI practices, and real-world enterprise AI applications. Developed understanding of modern AI ecosystems and emerging GenAI technologies.",
      image: genaiCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Programming Fundamentals Using Python – Part 1",
      provider: "Infosys Springboard",
      url: "https://drive.google.com/file/d/1G_zuJvj4uCUPy5HH2KzQFUuJNmKr3AbT/view?usp=sharing",
      description: "Built strong foundations in Python programming, covering variables, data types, operators, loops, functions, and problem-solving techniques. Developed analytical thinking and programming logic through hands-on coding exercises and practical implementations.",
      image: pythonPart1Cert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Programming Fundamentals Using Python – Part 2",
      provider: "Infosys Springboard",
      url: "https://drive.google.com/file/d/18LT9foZdgGxgIRMP_J0Dc9y6_6-7qW6Y/view?usp=sharing",
      description: "Advanced Python learning focused on data structures, modular programming, object-oriented concepts, and application development fundamentals. Strengthened coding proficiency through practical assignments and real-world programming scenarios.",
      image: pythonCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      title: "Basics of Python",
      provider: "Infosys Springboard",
      url: "https://drive.google.com/file/d/1T6eeXZjCe0-hicaj1RsB_JyvAdWpTx0y/view?usp=sharing",
      description: "Acquired foundational knowledge of Python syntax, programming constructs, debugging techniques, and software development best practices. Established a strong base for future work in data analytics, machine learning, and backend development.",
      image: pythonBasicsCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Innovation, Design & Entrepreneurship (IDE) Bootcamp",
      provider: "AICTE × Wadhwani × SBI",
      url: "https://drive.google.com/file/d/1CWOtSU6sBkRDu5DTVzQ-SgpnBSUl-djg/view?usp=sharing",
      description: "Participated in a national-level innovation and entrepreneurship bootcamp focused on design thinking, problem identification, business model development, and startup ideation. Collaborated with multidisciplinary teams to develop innovative solutions.",
      image: aicteCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      )
    },
    {
      title: "HackZenith 2025 – Top 10 Finalist",
      provider: "GDG (Google Developer Groups)",
      url: "https://drive.google.com/file/d/1ZSen-gBQIJxnExuvYTpMYtSEhAbbUaiC/view?usp=sharing",
      description: "Secured a Top 10 position among 150+ competing teams by designing, developing, and presenting a working software solution within strict hackathon timelines. Demonstrated strong problem-solving, teamwork, rapid prototyping, and technical execution.",
      image: gdgCert,
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 13H4a2 2 0 01-2-2V9a2 2 0 012-2h2m6 13h8a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
        </svg>
      )
    }
  ];

  return (
    <section
      id="certifications"
      className="expertise-section relative w-full pt-28 pb-40 px-6 md:px-12 overflow-hidden border-t border-slate-100"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/[0.02] rounded-full blur-[120px] pointer-events-none"></div>

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
          <div className="inline-flex items-center gap-2 border border-slate-200/80 bg-white px-5 py-1.5 text-xs text-[#ff2a2a] font-bold mb-6 shadow-sm uppercase tracking-wider rounded-full hover:border-[#ff2a2a]/30 transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-pulse" />
            <span>Credentials &amp; Courses</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
            Verified Skills &amp; Certifications
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
            Continuous education and technical development in cloud architecture, generative AI systems, and modern programming principles.
          </p>
        </motion.div>

        {/* Responsive Grid Layout */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch"
        >
          {certs.map((cert) => (
            <CertificationCard
              key={cert.title}
              title={cert.title}
              provider={cert.provider}
              description={cert.description}
              url={cert.url}
              icon={cert.icon}
              image={cert.image}
            />
          ))}
        </motion.div>

      </motion.div>

      {/* Torn paper divider at bottom transitioning from white Certifications section to dark Contact section */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-30 transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 fill-[#0a0a0a]">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.62,189.5,99.8,242.79,81.82,282.88,63.6,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Certifications;
