import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technologies = ["React.js", "Node.js", "Java", "Python", "MongoDB"];

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [techIndex, setTechIndex] = useState(0);

  useEffect(() => {
    // Rotating tech stack text
    const techInterval = setInterval(() => {
      setTechIndex((prev) => (prev + 1) % technologies.length);
    }, 400);

    // Wait for the water fill animation (1.6s) + a small pause (0.6s)
    // before the shutter goes up smoothly. Total 2.2s.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);

    return () => {
      clearInterval(techInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 w-full h-screen bg-[#ff2a2a] z-[100000] flex items-center justify-center"
        >
          {/* Content Wrapper to keep logo dead center */}
          <div className="relative flex flex-col items-center justify-center">

            {/* Logo Container */}
            <motion.div
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative text-5xl md:text-7xl font-black tracking-tighter"
            >
              {/* Background text (empty state) */}
              <div className="text-red-900/30">
                Abhik<span className="text-red-900/30">.</span>
              </div>

              {/* Foreground text (water fill state) */}
              <motion.div
                className="absolute top-0 left-0 text-white overflow-hidden whitespace-nowrap"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={{ clipPath: 'inset(0% 0 0 0)' }}
                transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
              >
                Abhik<span className="text-black">.</span>
              </motion.div>
            </motion.div>

            {/* Subtitle & Loading Indicator Container */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute -bottom-24 md:-bottom-28 flex flex-col items-center gap-4 w-[300px]"
            >
              <div className="text-[10px] md:text-xs font-bold tracking-[0.35em] text-white/90 uppercase">
                Java Full Stack Developer
              </div>

              {/* Rotating Technologies & Loader */}
              <div className="flex items-center justify-center gap-3 text-[10px] md:text-xs font-mono text-white/70">
                {/* Tailwind SVG Spinner */}
                <svg className="animate-spin h-3.5 w-3.5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>

                <div className="w-20 text-left overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={techIndex}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="font-bold uppercase tracking-widest text-black/80"
                    >
                      {technologies[techIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
