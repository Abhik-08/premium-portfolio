import React, { useRef, useEffect, useState } from 'react';
import { LazyMotion, domAnimation, m, useInView } from 'framer-motion';
import PropTypes from 'prop-types';
import EducationCard from './EducationCard';
import './education.css';

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

// Reusable Count-up Counter component
const Counter = ({ value, duration = 1.2, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const isFloat = value.includes('.');
      const end = Number.parseFloat(value);
      if (Number.isNaN(end)) return;

      const totalMiliseconds = duration * 1000;
      const stepTime = 16; // ~60fps
      const steps = totalMiliseconds / stepTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(isFloat ? Math.round(start * 100) / 100 : Math.round(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  const formattedCount = count.toFixed(value.includes('.') ? 2 : 0);
  return (
    <span ref={ref}>
      {prefix}{formattedCount}{suffix}
    </span>
  );
};

Counter.propTypes = {
  value: PropTypes.string.isRequired,
  duration: PropTypes.number,
  suffix: PropTypes.string,
  prefix: PropTypes.string
};

const Education = () => {
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const sectionRef = useRef(null);

  const stats = [
    {
      value: "7.86",
      label: "Current CGPA",
      prefix: "",
      suffix: ""
    },
    {
      value: "15",
      label: "Projects Built",
      prefix: "",
      suffix: "+"
    },
    {
      value: "8",
      label: "Certifications",
      prefix: "",
      suffix: "+"
    },
    {
      value: "10",
      label: "Hackathon Achievement",
      prefix: "Top ",
      suffix: ""
    }
  ];

  const educationHistory = [
    {
      institution: "Dr. B. C. Roy Engineering College",
      degree: "B.Tech in Computer Science & Engineering",
      duration: "Aug 2023 – Present",
      score: "CGPA: 7.86 (Up to 5th Sem)",
      location: "Durgapur, West Bengal",
      tags: ["Computer Science", "Software Engineering", "AI", "Data Analytics", "Cloud Computing"],
      description: "Pursuing Computer Science and Engineering with focus on software development, artificial intelligence, data analytics, cloud technologies, and scalable application development. Actively involved in technical projects, hackathons, certifications, and industry-oriented learning.",
      highlights: [
        "Built an end-to-end Tableau analytics solution on 148,770 Uber ride records.",
        "Achieved Top 10 rank in regional Google Developer Group (GDG) Hackathon.",
        "Maintained a strong academic GPA of 7.86 (up to 5th semester)."
      ],
      technicalInterests: "Full Stack Development, Cloud Systems, AI/ML, Ride Analytics",
      yearWatermark: "2023",
      isSpecial: true,
      storyLabel: "Engineering the Future"
    },
    {
      institution: "Sree Ayyappa Public School",
      degree: "Higher Secondary (CBSE)",
      duration: "2019 – 2021",
      score: "Score: 84.8%",
      location: "Bokaro Steel City, Jharkhand",
      tags: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      description: "Completed higher secondary education with strong academic performance in Mathematics, Physics, and Computer Science.",
      highlights: [
        "Graduated with distinction scoring 84.8% aggregate in CBSE Boards.",
        "Excelled in Computer Science (C++ & Database management foundation)."
      ],
      technicalInterests: "C++ Programming, Physics, Advanced Algebra",
      yearWatermark: "2021",
      isSpecial: false,
      storyLabel: "Building Foundations"
    },
    {
      institution: "Sacred Heart School",
      degree: "Secondary (ICSE)",
      duration: "2019",
      score: "Score: 93%",
      location: "Purulia, West Bengal",
      tags: ["Secondary Education", "General Science", "Computer Applications"],
      description: "Achieved excellent academic performance while developing analytical thinking, leadership, and problem-solving skills.",
      highlights: [
        "Achieved high honors with a 93% aggregate in ICSE Boards.",
        "Received academic excellence awards in Mathematics and Science."
      ],
      technicalInterests: "Computer Fundamentals, Logical Reasoning, Science Foundations",
      yearWatermark: "2019",
      isSpecial: false,
      storyLabel: "Beginning the Journey"
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="education"
        ref={sectionRef}
        className="education-section relative w-full pt-28 pb-40 px-6 md:px-12 overflow-hidden border-t border-white/5"
      >
        {/* Background Ambient Blobs and Noise Overlay */}
        <div className="education-bg-blobs">
          <m.div 
            className="bg-ambient-blob w-[500px] h-[500px] -top-32 -left-48"
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -50, 30, 0],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <m.div 
            className="bg-ambient-blob w-[600px] h-[600px] -bottom-64 -right-48"
            animate={{
              x: [0, -50, 30, 0],
              y: [0, 40, -20, 0],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="noise-texture opacity-[0.012]" />
        </div>

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.02 }}
          className="max-w-7xl mx-auto relative z-10"
        >
          
          {/* Header Content */}
          <m.div 
            variants={itemVariants}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-5 py-1.5 text-xs text-[#ff2a2a] font-bold mb-6 shadow-sm uppercase tracking-wider rounded-full hover:border-[#ff2a2a]/30 transition-colors duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a]" />
              <span>Education</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.15] mb-6 tracking-tight">
              Academic Journey
            </h2>
            <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
              Building a strong foundation in Computer Science while continuously expanding expertise through projects, certifications, hackathons, and industry learning.
            </p>
          </m.div>
    
          {/* Stats Counters Grid */}
          <m.div variants={containerVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32 max-w-5xl mx-auto w-full relative z-10">
            {stats.map((stat) => (
              <m.div
                key={stat.label}
                variants={itemVariants}
                className="stat-counter-card p-6 rounded-3xl flex flex-col justify-center items-center text-center group"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 group-hover:text-[#ff2a2a] transition-colors duration-300">
                  <Counter 
                    value={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix} 
                  />
                </div>
                <div className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest leading-normal max-w-[160px]">
                  {stat.label}
                </div>
              </m.div>
            ))}
          </m.div>

          {/* Timeline Layout */}
          <m.div layout className="education-timeline relative px-4 lg:px-0">
            
            {/* Animated Vertical Timeline Track Line */}
            <m.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="timeline-track-line" 
            />

            {/* Timeline Cards Container */}
            <div className="flex flex-col w-full relative z-10">
              {educationHistory.map((edu, idx) => {
                const isLeft = idx % 2 === 0;
                const xStart = isLeft ? -50 : 50;

                return (
                  <React.Fragment key={edu.institution}>
                    {/* Storytelling Floating Label above corresponding row */}
                    <div className="timeline-story-label">
                      <span className="timeline-story-label-inner">{edu.storyLabel}</span>
                    </div>

                    <m.div 
                      layout
                      className={`education-timeline-row ${isLeft ? 'lg:justify-start' : 'lg:justify-end'}`}
                    >
                      {/* Giant Year Watermark behind cards */}
                      <div className="year-watermark">
                        {edu.yearWatermark}
                      </div>

                      {/* Timeline Marker Dot (Breaths continuously and glows reactively on card hover) */}
                      <div className={`timeline-dot-outer-premium timeline-dot-premium-pulse ${hoveredCardIdx === idx ? 'active' : ''}`}>
                        <div className="timeline-dot-inner-premium" />
                      </div>

                      {/* Academic Card with Entrance Slide Animation */}
                      <m.div
                        layout
                        initial={{ opacity: 0, x: xStart }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 80,
                          damping: 15,
                          mass: 0.8
                        }}
                        className="w-full lg:w-[calc(50%-3rem)] relative"
                      >
                        <EducationCard
                          institution={edu.institution}
                          degree={edu.degree}
                          duration={edu.duration}
                          score={edu.score}
                          location={edu.location}
                          description={edu.description}
                          tags={edu.tags}
                          highlights={edu.highlights}
                          technicalInterests={edu.technicalInterests}
                          isSpecial={edu.isSpecial}
                          onHoverChange={(isHovered) => setHoveredCardIdx(isHovered ? idx : null)}
                        />
                      </m.div>
                    </m.div>
                  </React.Fragment>
                );
              })}
            </div>
          </m.div>

        </m.div>
      </section>
    </LazyMotion>
  );
};

export default Education;



