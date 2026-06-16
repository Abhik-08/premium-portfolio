import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ExpertiseCard = ({ 
  number, 
  title, 
  description, 
  icon, 
  floatDuration, 
  parallaxY,
  isMobile,
  initial,
  animate,
  delay
}) => {
  // Card theme selection based on number
  const isRedBg = number === '01' || number === '03';

  // Card Content
  const CardContent = (
    <motion.div
      whileHover={isMobile ? {} : {
        scale: 1.02,
        y: -6,
        transition: { duration: 0.25 }
      }}
      className={`expertise-glass-card ${
        isRedBg 
          ? 'glass-card-red text-white' 
          : 'glass-card-white text-slate-800'
      } relative p-8 rounded-[2.2rem] flex flex-col justify-between w-full min-h-[320px] h-full cursor-pointer select-none group`}
    >
      {/* Silver rivet pin at top center */}
      <div className="card-rivet" />

      {/* Decorative colored glow blob inside white cards */}
      {!isRedBg && (
        <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-gradient-to-br from-[#ff2a2a] to-[#ff5252] opacity-[0.02] group-hover:opacity-[0.06] blur-2xl transition-opacity duration-500 pointer-events-none" />
      )}

      {/* Top Section: Number and Icon */}
      <div className="flex justify-between items-start pt-3">
        {isRedBg ? (
          <span className="card-number text-white/90">
            {number}
          </span>
        ) : (
          <span className="card-number bg-gradient-to-r from-slate-400 to-zinc-400 bg-clip-text text-transparent">
            {number}
          </span>
        )}

        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 shadow-sm ${
          isRedBg
            ? 'bg-white/10 border border-white/20 text-white group-hover:bg-white group-hover:text-[#ff2a2a] group-hover:border-transparent group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.25)]'
            : 'bg-zinc-100 border border-zinc-200/70 text-slate-700 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_4px_12px_rgba(255,42,42,0.25)]'
        }`}>
          {icon}
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-4 flex-grow flex flex-col justify-center">
        <h3 className={`text-2xl font-black mb-3 tracking-tight transition-colors duration-300 ${
          isRedBg 
            ? 'text-white group-hover:text-slate-100' 
            : 'text-slate-900 group-hover:text-[#ff2a2a]'
        }`}>
          {title}
        </h3>
        <p className={`text-sm font-semibold leading-relaxed tracking-wide transition-colors duration-300 ${
          isRedBg
            ? 'text-white/90 group-hover:text-white'
            : 'text-slate-650 group-hover:text-slate-800'
        }`}>
          {description}
        </p>
      </div>
    </motion.div>
  );

  // Return mobile cards without complex float & parallax wrappers to ensure swipe performance
  if (isMobile) {
    return (
      <div className="w-full">
        {CardContent}
      </div>
    );
  }

  // Desktop layered animation wrappers
  return (
    <motion.div
      style={{ y: parallaxY }} // Parallax scroll motion layer
      className="w-full max-w-[380px]"
    >
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 14,
          delay: delay
        }}
      >
        <motion.div
          animate={{
            y: [-8, 8, -8]
          }}
          transition={{
            duration: floatDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {CardContent}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

ExpertiseCard.propTypes = {
  number: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  floatDuration: PropTypes.number.isRequired,
  parallaxY: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
  initial: PropTypes.object.isRequired,
  animate: PropTypes.object.isRequired,
  delay: PropTypes.number.isRequired
};

export default ExpertiseCard;
