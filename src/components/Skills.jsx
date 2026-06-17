import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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

const SkillCard = ({ title, skills, description, icon }) => {
  const hoverAnimation = globalThis.window !== undefined && globalThis.window.innerWidth >= 1024 ? { y: -6, scale: 1.02 } : {};

  return (
    <motion.div
      variants={itemVariants}
      whileHover={hoverAnimation}
      transition={{
        duration: 0.25
      }}
      className="group glass-card-white rounded-[2.5rem] p-8 flex flex-col h-full border border-slate-200/60 bg-white hover:border-[#ff2a2a]/45 hover:shadow-[0_25px_60px_rgba(255,42,42,0.16)] transition-all duration-500 relative overflow-hidden"
    >
      {/* Sleek laser top border that expands from center on hover */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-[3px] bg-gradient-to-r from-transparent via-[#ff2a2a] to-transparent group-hover:w-full transition-all duration-500 ease-out pointer-events-none" />

      {/* Decorative red inner glow on hover */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#ff2a2a]/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
      />

      {/* Soft red spotlight glow at the bottom right */}
      <div 
        className="absolute -right-16 -bottom-16 w-36 h-36 bg-[#ff2a2a]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
      />

      <div>
        {/* Category Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shadow-inner text-[#ff2a2a] group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-slate-950 transition-colors duration-300">
            {title}
          </h3>
        </div>

        {/* Category Subtitle */}
        <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 group-hover:text-slate-600 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Skills Badge List */}
      <div 
        className="flex flex-wrap gap-2.5 mt-auto z-10"
      >
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/80 group-hover:border-[#ff2a2a]/15 group-hover:bg-red-50/10 hover:!bg-[#ff2a2a] hover:!text-white hover:!border-transparent hover:!shadow-[0_4px_12px_rgba(255,42,42,0.25)] transition-all duration-300 cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

SkillCard.propTypes = {
  title: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      skills: [
        'Java', 'Spring Boot', 'Spring MVC', 'Spring AI', 'Hibernate', 'Maven', 
        'React.js', 'JavaScript', 'Python', 'C', 'SQL', 'REST APIs'
      ],
      description: 'Building backend business logic, rest interfaces, and interactive web UIs.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      title: 'Databases & Tools',
      skills: [
        'MySQL', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Linux', 
        'Git', 'GitHub', 'Postman', 'IntelliJ IDEA', 'VS Code'
      ],
      description: 'Managing secure data persistence, containerized environments, and DevOps workflows.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75m-16.5-3.75v3.75" />
        </svg>
      )
    },
    {
      title: 'Data, ML & GenAI',
      skills: [
        'NumPy', 'Pandas', 'Scikit-learn', 'Tableau', 'OpenCV', 
        'RAG', 'Prompt Engineering'
      ],
      description: 'Analyzing datasets, visualizing metrics, and integrating semantic AI search capabilities.',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-.813-5.096m.813 5.096a11.97 11.97 0 01-3.007-1.248m3.007 1.248a11.98 11.98 0 003.007-1.248M9 10.5h.008v.008H9V10.5zm0 2.25h.008v.008H9v-.008zm3-2.25h.008v.008H12V10.5zm0 2.25h.008v.008H12v-.008zm3-2.25h.008v.008H15V10.5zm0 2.25h.008v.008H15v-.008zm-6-4.5h.008v.008H9V6zm0 2.25h.008v.008H9V8.25zm3-2.25h.008v.008H12V6zm0 2.25h.008v.008H12V8.25zm3-2.25h.008v.008H15V6zm0 2.25h.008v.008H15V8.25z" />
        </svg>
      )
    }
  ];

  return (
    <section 
      id="skills" 
      className="expertise-section relative w-full text-slate-800 pt-28 pb-36 px-6 md:px-12 overflow-hidden border-t border-slate-100"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-400/[0.01] rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.02 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        
        {/* Header content */}
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
          <div 
            className="inline-flex items-center gap-2 border border-slate-200/80 bg-white px-5 py-1.5 text-xs text-[#ff2a2a] font-bold mb-6 shadow-sm uppercase tracking-wider rounded-full hover:border-[#ff2a2a]/30 transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-pulse" />{' '}
            Technical Arsenal
          </div>
          <h2 
            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight"
          >
            Skills &amp; Technology Stack
          </h2>
          <p 
            className="text-slate-500 text-base md:text-lg font-medium leading-relaxed"
          >
            A curated list of programming languages, libraries, enterprise frameworks, databases, and generative AI tools that I leverage to build scalable systems.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {skillCategories.map((category, catIdx) => (
            <div key={category.title} className={catIdx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}>
              <SkillCard
                title={category.title}
                skills={category.skills}
                description={category.description}
                icon={category.icon}
              />
            </div>
          ))}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Skills;
