import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { m, AnimatePresence } from 'framer-motion';

const EducationCard = ({ 
  institution, 
  degree, 
  duration, 
  score, 
  location, 
  description, 
  tags, 
  highlights, 
  technicalInterests,
  isSpecial = false,
  onHoverChange = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
      onHoverChange(true);
    }, 150); // 0.15s hover start delay
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
    onHoverChange(false);
  };

  // Tag stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <m.article
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -6,
        scale: isSpecial ? 1.02 : 1.01
      }}
      transition={{
        layout: { type: "spring", stiffness: 260, damping: 28 },
        duration: 0.2
      }}
      className={`education-card-wrapper w-full z-10 cursor-pointer ${isSpecial ? 'lg:scale-[1.12] lg:my-4' : ''}`}
    >
      <div className={`education-card-inner ${isSpecial ? 'btech-card-special' : ''}`}>
        {/* Red ambient light expands behind card */}
        <div className="card-ambient-glow" />

        {/* Content container */}
        <div className="glass-card-content flex flex-col justify-between">
          <div className="text-left">
            {/* Title & Degree (Default) */}
            <div className="flex flex-col gap-1.5">
              <h3 className={`font-black text-white tracking-tight ${isSpecial ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                {institution}
              </h3>
              <h4 className={`font-bold text-[#ff2a2a] mt-0.5 ${isSpecial ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}>
                {degree}
              </h4>
            </div>

            {/* Duration & Score (Default) */}
            <div className="flex flex-wrap gap-3 items-center text-slate-300 font-semibold text-xs md:text-sm mt-4">
              {/* Duration Badge */}
              <div className="flex items-center gap-1.5 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span>{duration}</span>
              </div>

              {/* Score Badge */}
              <div className="flex items-center gap-1.5 bg-[#ff2a2a]/10 text-[#ff2a2a] px-3.5 py-1.5 rounded-full border border-[#ff2a2a]/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.62 48.62 0 0112 20.9c4.956-1.9 8.2-5.642 8.218-10.741a60.43 60.43 0 00-.491-6.347L12 1.5 4.26 4.416zm0 0a3.01 3.01 0 001.378-2.518V6a3 3 0 003 3h4a3 3 0 003-3V1.629a3.01 3.01 0 001.378 2.518" />
                </svg>
                <span className="font-bold">{score}</span>
              </div>
            </div>

            {/* Hover State: Expanded content with fluid height animation */}
            <AnimatePresence>
              {isHovered && (
                <m.div
                  key="expanded-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="pt-5 mt-5 border-t border-white/10 flex flex-col gap-4 text-left overflow-hidden"
                >
                  {/* Location Info */}
                  <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-300">
                    <div className="flex items-center gap-1.5 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{location}</span>
                    </div>
                  </div>

                  {/* Focus Areas (Tags) */}
                  {tags.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Focus Areas</span>
                      <m.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2"
                      >
                        {tags.map((tag) => (
                          <m.span 
                            key={tag} 
                            variants={tagVariants}
                            className="text-[10px] font-mono font-bold tracking-wider text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 hover:border-[#ff2a2a]/30 hover:text-white transition-colors duration-200"
                          >
                            {tag}
                          </m.span>
                        ))}
                      </m.div>
                    </div>
                  )}

                  {/* Technical Interests */}
                  {technicalInterests && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Technical Interests</span>
                      <p className="text-xs font-semibold text-[#ff2a2a]">{technicalInterests}</p>
                    </div>
                  )}

                  {/* Description / Academic Journey */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Academic Journey</span>
                    <p className="text-sm font-medium leading-relaxed text-slate-400">
                      {description}
                    </p>
                  </div>

                  {/* Highlights / Key Achievements */}
                  {highlights && highlights.length > 0 && (
                    <div className="flex flex-col gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Achievements</span>
                      <ul className="list-disc pl-4 flex flex-col gap-1.5">
                        {highlights.map((highlight) => (
                          <li key={highlight} className="text-xs text-slate-400 leading-relaxed">
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </m.article>
  );
};

EducationCard.propTypes = {
  institution: PropTypes.string.isRequired,
  degree: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  score: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  highlights: PropTypes.arrayOf(PropTypes.string),
  technicalInterests: PropTypes.string,
  isSpecial: PropTypes.bool,
  onHoverChange: PropTypes.func
};

EducationCard.defaultProps = {
  tags: [],
  highlights: [],
  technicalInterests: '',
  isSpecial: false,
  onHoverChange: () => {}
};

export default EducationCard;
