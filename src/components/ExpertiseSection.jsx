import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ExpertiseCard from './ExpertiseCard';
import FloatingParticles from './FloatingParticles';
import resumePdf from '../assets/about/Abhik_Resume_Template_TCS.pdf';
import '../styles/expertise.css';

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

const ExpertiseSection = () => {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Resize listener to toggle responsive layouts
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(globalThis.window.innerWidth >= 1024);
    };
    checkViewport();
    globalThis.window.addEventListener('resize', checkViewport);
    return () => globalThis.window.removeEventListener('resize', checkViewport);
  }, []);

  // Mouse move spotlight position handler via DOM listener to avoid JSX accessibility warnings
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      section.style.setProperty('--mouse-x', `${x}px`);
      section.style.setProperty('--mouse-y', `${y}px`);
    };

    section.addEventListener('mousemove', handleMouseMove);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Set up scroll progress mapping for card parallax shift and connector path
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yParallax1 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yParallax3 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const yParallax4 = useTransform(scrollYProgress, [0, 1], [35, -35]);

  // Scroll to Projects section on CTA click
  const scrollToProjects = (e) => {
    e.preventDefault();
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cards definitions containing text, icons, and custom entrance physics
  const cardsData = [
    {
      number: '01',
      title: 'Frontend Engineering',
      description: 'Building fast, responsive, and engaging user interfaces using React.js, JavaScript, component-based architecture, and modern web technologies.',
      rotation: 8,
      floatDuration: 4.6,
      parallaxY: yParallax1,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      ),
      initial: { opacity: 0, x: 120, rotate: 15 },
      animate: { opacity: 1, x: 0, rotate: 8 },
      delay: 0.08
    },
    {
      number: '02',
      title: 'Java Backend Development',
      description: 'Designing scalable APIs and enterprise-grade systems using Java, Spring Boot, Spring MVC, Hibernate, Maven, and RESTful architecture.',
      rotation: -8,
      floatDuration: 5.4,
      parallaxY: yParallax2,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      initial: { opacity: 0, y: 120, rotate: -15 },
      animate: { opacity: 1, y: 0, rotate: -8 },
      delay: 0.16
    },
    {
      number: '03',
      title: 'Cloud & Databases',
      description: 'Managing production-ready deployments, databases, containers, and cloud infrastructure with AWS, Docker, MySQL, PostgreSQL, and MongoDB.',
      rotation: 4,
      floatDuration: 5,
      parallaxY: yParallax3,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      initial: { opacity: 0, x: 120, rotate: 10 },
      animate: { opacity: 1, x: 0, rotate: 4 },
      delay: 0.24
    },
    {
      number: '04',
      title: 'Data Analytics & GenAI',
      description: 'Building intelligent solutions using Python, Pandas, NumPy, Scikit-learn, Tableau, RAG systems, Prompt Engineering, and AI workflows.',
      rotation: -4,
      floatDuration: 6.2,
      parallaxY: yParallax4,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      initial: { opacity: 0, y: 120, rotate: -10 },
      animate: { opacity: 1, y: 0, rotate: -4 },
      delay: 0.32
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="expertise-section relative w-full pt-32 pb-44 px-6 md:px-12 overflow-hidden z-10 border-t border-slate-100"
      aria-label="Expertise Showcase"
    >
      {/* Spotlight mouse-follow element */}
      <div className="spotlight-overlay" />

      {/* Ambient background glowing circles */}
      <div className="absolute top-[15%] left-[20%] w-72 h-72 rounded-full bg-red-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-slate-500/[0.02] blur-[130px] pointer-events-none" />

      {/* Performance optimized background floating canvas particles */}
      <FloatingParticles />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center relative z-10"
      >
        
        {/* Left Side: Copywriting Content */}
        <motion.div variants={containerVariants} className="lg:col-span-5 flex flex-col justify-center items-start text-left">
          {/* Section Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-block border border-slate-200 bg-white px-4 py-1.5 rounded-full mb-6 shadow-sm"
          >
            <span className="text-xs font-bold tracking-[0.15em] text-[#ff2a2a] uppercase">
              My Expertise
            </span>
          </motion.div>

          {/* Large Title */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] mb-6"
          >
            Building Intelligent <br />
            Digital Products <br />
            with Code, Data <br />
            <span className="bg-gradient-to-r from-[#ff2a2a] to-[#ff5252] bg-clip-text text-transparent">
              &amp; AI
            </span>
          </motion.h2>

          {/* Bio Description */}
          <motion.p
            variants={itemVariants}
            className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 font-medium max-w-md"
          >
            Combining full-stack development, artificial intelligence, and cloud technologies to create scalable and impactful digital experiences.
          </motion.p>

          {/* CTA Links */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#services"
              onClick={scrollToProjects}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-sm tracking-wider hover:bg-slate-850 hover:shadow-[0_0_20px_rgba(255,42,42,0.15)] border border-transparent transition-all duration-300 shadow-md"
            >
              <span>View Projects</span>
              <svg className="w-4 h-4 text-[#ff2a2a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </a>

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-slate-900 border border-slate-200 hover:border-[#ff2a2a]/40 hover:text-[#ff2a2a] hover:shadow-[0_0_20px_rgba(255,42,42,0.1)] font-bold text-sm tracking-wider transition-all duration-300 shadow-sm"
            >
              <span>View Resume</span>
              <svg className="w-4 h-4 text-[#ff2a2a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5L5.25 12.75" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Arena of diagonal floating cards / Mobile slider */}
        <div className="lg:col-span-7 w-full flex justify-center relative">
          
          {isDesktop ? (
            /* Non-overlapping Staggered Grid view on desktop */
            <div className="relative w-full max-w-[800px]">
              
              <div className="grid grid-cols-2 gap-8 items-start w-full relative z-10">
                {/* Column 1: Card 01 & 03 */}
                <div className="flex flex-col gap-10">
                  <ExpertiseCard
                    number={cardsData[0].number}
                    title={cardsData[0].title}
                    description={cardsData[0].description}
                    icon={cardsData[0].icon}
                    rotation={cardsData[0].rotation}
                    floatDuration={cardsData[0].floatDuration}
                    parallaxY={cardsData[0].parallaxY}
                    isMobile={false}
                    initial={cardsData[0].initial}
                    animate={cardsData[0].animate}
                    delay={cardsData[0].delay}
                  />
                  <ExpertiseCard
                    number={cardsData[2].number}
                    title={cardsData[2].title}
                    description={cardsData[2].description}
                    icon={cardsData[2].icon}
                    rotation={cardsData[2].rotation}
                    floatDuration={cardsData[2].floatDuration}
                    parallaxY={cardsData[2].parallaxY}
                    isMobile={false}
                    initial={cardsData[2].initial}
                    animate={cardsData[2].animate}
                    delay={cardsData[2].delay}
                  />
                </div>

                {/* Column 2: Card 02 & 04 (staggered down via translate-y-16) */}
                <div className="flex flex-col gap-10 stagger-col-2">
                  <ExpertiseCard
                    number={cardsData[1].number}
                    title={cardsData[1].title}
                    description={cardsData[1].description}
                    icon={cardsData[1].icon}
                    rotation={cardsData[1].rotation}
                    floatDuration={cardsData[1].floatDuration}
                    parallaxY={cardsData[1].parallaxY}
                    isMobile={false}
                    initial={cardsData[1].initial}
                    animate={cardsData[1].animate}
                    delay={cardsData[1].delay}
                  />
                  <ExpertiseCard
                    number={cardsData[3].number}
                    title={cardsData[3].title}
                    description={cardsData[3].description}
                    icon={cardsData[3].icon}
                    rotation={cardsData[3].rotation}
                    floatDuration={cardsData[3].floatDuration}
                    parallaxY={cardsData[3].parallaxY}
                    isMobile={false}
                    initial={cardsData[3].initial}
                    animate={cardsData[3].animate}
                    delay={cardsData[3].delay}
                  />
                </div>
              </div>

            </div>
          ) : (
            /* Fully responsive stacked grid for mobile and tablet */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[700px] px-2">
              {cardsData.map((card) => (
                <ExpertiseCard
                  key={card.number}
                  number={card.number}
                  title={card.title}
                  description={card.description}
                  icon={card.icon}
                  rotation={0}
                  floatDuration={card.floatDuration}
                  parallaxY={null}
                  isMobile={true}
                  initial={card.initial}
                  animate={card.animate}
                  delay={card.delay}
                />
              ))}
            </div>
          )}
        </div>

      </motion.div>
    </section>
  );
};

export default ExpertiseSection;
