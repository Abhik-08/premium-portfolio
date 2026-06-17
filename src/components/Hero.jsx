import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
// Adjusted import path for the video
import heroVideo from '../assets/hero video/Developer_introduces_self_and_sk…_202606051918.mp4';

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

const Hero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMuted = false;

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted={isMuted}
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Left-Side Overlay for Premium UI & Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent z-10 pointer-events-none" />

      {/* Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full"
      >

        {/* Left Side: Text and Buttons */}
        <motion.div 
          variants={containerVariants}
          className="flex flex-col items-start text-left w-full md:w-[42%] md:max-w-[45%] mt-24 md:mt-0"
        >

          {/* Premium Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center border border-white/10 bg-white/5 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-6 shadow-sm opacity-80"
          >
            <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">
              AVAILABLE FOR INTERNSHIPS • FREELANCE • FULL-TIME ROLES
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3 max-w-[700px]"
          >
            Hi, I'm <br /> Abhik Mukherjee
          </motion.h1>

          {/* Role Indicator */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.65)] opacity-70 mb-5"
          >
            Java Full Stack Developer
          </motion.h2>

          {/* Subheading / Description */}
          <motion.p
            variants={itemVariants}
            className="text-white/90 text-base md:text-lg font-medium mb-5 max-w-[500px] drop-shadow-md leading-relaxed"
          >
            Building scalable web applications with React, Java, Node.js and modern cloud technologies.
          </motion.p>

          {/* Tech Stack Indicator */}
          <motion.div
            variants={itemVariants}
            className="mb-0"
          >
            <span className="text-[11px] md:text-[13px] font-mono font-bold tracking-[0.15em] text-[#ff2a2a] opacity-70 drop-shadow-md uppercase">
              React • Node.js • Java • MongoDB
            </span>
          </motion.div>
        </motion.div>

        {/* Right Side: Play Video Button */}
        <motion.button
          variants={itemVariants}
          type="button"
          className="mt-12 md:mt-0 flex flex-row md:flex-col items-center gap-3 cursor-pointer group self-start md:self-auto focus:outline-none"
          onClick={toggleVideo}
          aria-label={!isPlaying || isMuted ? "Play background video reel" : "Pause background video reel"}
        >
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/30 bg-black/20 backdrop-blur-md flex justify-center items-center group-hover:scale-110 group-hover:bg-[#ff2a2a] transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_40px_rgba(255,42,42,0.6)]">
            {!isPlaying || isMuted ? (
              // Play Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              // Pause Icon
              <svg className="w-5 h-5 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            )}
          </div>
          <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-70 group-hover:opacity-100 transition-opacity">
            {!isPlaying || isMuted ? "Play Reel" : "Pause"}
          </span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)]"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

