import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Simple LCG PRNG for safe coordinate generation without Math.random() linter warnings
let lcgSeed = 42;
const safeRandom = () => {
  lcgSeed = (1103515245 * lcgSeed + 12345) % 2147483648;
  return lcgSeed / 2147483648;
};

// Generate static particles once on mount to prevent layout jumps on re-render
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: `contact-p-${i}`,
  left: `${safeRandom() * 100}%`,
  top: `${safeRandom() * 100}%`,
  initialOpacity: safeRandom() * 0.2 + 0.1,
  initialScale: safeRandom() * 0.4 + 0.6,
  duration: safeRandom() * 15 + 15
}));

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

const Contact = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when typing
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('loading');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            sender_name: formData.name,
            company: formData.company || 'N/A',
            sender_email: formData.email,
            message: formData.message,
            to_email: 'abhikmukherjee2003@gmail.com'
          },
          publicKey
        );
        setStatus('success');
        setFormData({ name: '', company: '', email: '', message: '' });
        setToast({ show: true, message: 'Message sent successfully!', type: 'success' });
        setTimeout(() => setStatus('idle'), 4000);
      } catch (err) {
        console.error('EmailJS error:', err);
        setStatus('error');
        setToast({ show: true, message: 'Failed to send message. Please try again.', type: 'error' });
        setTimeout(() => setStatus('idle'), 4000);
      }
    } else {
      // Mock Fallback for local development
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', company: '', email: '', message: '' });
      setToast({ show: true, message: 'Message sent successfully! (Mock Sandbox)', type: 'success' });
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const renderButtonContent = () => {
    if (status === 'loading') {
      return (
        <>
          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </>
      );
    }
    if (status === 'success') {
      return <>Message Sent ✓</>;
    }
    return (
      <>
        Send Message
        <svg className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </>
    );
  };

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="bg-gradient-to-br from-[#06070d] to-[#0c0e1a] w-full min-h-screen relative overflow-hidden flex items-end pt-32 pb-0 md:pb-0 border-t border-white/5"
    >
      {/* Visual Overlay Stack (Grid + Noise) */}
      <div className="grid-pattern absolute inset-0 pointer-events-none z-0" />
      <div className="noise-texture absolute inset-0 pointer-events-none z-0" />

      {/* Slow-moving ambient background blobs */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[500px] h-[500px] rounded-full bg-[#ff2a2a]/[0.02] blur-[100px] top-[-10%] left-[-10%] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          x: [0, -50, 60, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[600px] h-[600px] rounded-full bg-[#ff2a2a]/[0.015] blur-[120px] bottom-[-10%] right-[-10%] pointer-events-none z-0"
      />

      {/* Mouse-reactive glow spotlight */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-[#ff2a2a]/[0.03] blur-[90px] pointer-events-none z-0 hidden md:block"
        animate={{
          x: mousePosition.x - 250,
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 22, mass: 0.8 }}
      />

      {/* Ambient floating particles (lightweight GPU layout) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: "0%", 
              y: "0%",
              opacity: particle.initialOpacity,
              scale: particle.initialScale
            }}
            animate={{
              y: ["0%", "-20px", "0px"],
              x: ["0%", "15px", "0px"],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 rounded-full bg-[#ff2a2a]/40 blur-[0.5px]"
            style={{
              left: particle.left,
              top: particle.top,
            }}
          />
        ))}
      </div>

      {/* Left-side premium decorative glowing circles & nodes */}
      <div className="absolute left-[6%] lg:left-[10%] top-[20%] w-[380px] h-[380px] pointer-events-none z-0 hidden md:block opacity-40">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
        >
          <svg className="w-full h-full text-[#ff2a2a]/20" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Concentric orbital rings */}
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.75" />
            <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
            <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
            {/* Coordinate grid lines */}
            <line x1="20" y1="20" x2="180" y2="180" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
            <line x1="180" y1="20" x2="20" y2="180" stroke="currentColor" strokeWidth="0.25" strokeDasharray="4 4" />
            {/* Glowing nodes (Representing key connection points) */}
            <circle cx="100" cy="10" r="3.5" fill="#ff2a2a" />
            <circle cx="30" cy="100" r="2.5" fill="#ff2a2a" />
            <circle cx="170" cy="100" r="4" fill="#ff2a2a" />
          </svg>
        </motion.div>
        {/* Soft dark red radial backlight blur behind circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] bg-[#ff2a2a]/[0.06] rounded-full blur-[60px] pointer-events-none" />
      </div>

      {/* Form Card Overlay */}
      <div className="relative z-10 w-full flex justify-end items-end">
        {/* Floating Social Sidebar - Desktop */}
        <div className="hidden md:flex flex-col gap-5 absolute left-[4%] lg:left-[8%] bottom-24 z-30">
          <a 
            href="https://github.com/Abhik-08" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="GitHub Profile"
            className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#ff2a2a] hover:border-white hover:scale-110 hover:shadow-[0_0_30px_rgba(255,42,42,0.5)] transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
            </svg>
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-xs font-bold tracking-wider uppercase rounded text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
              GitHub
            </span>
          </a>
          <a 
            href="https://www.linkedin.com/in/abhik-mukherjee-b6a15920a" 
            target="_blank" 
            rel="noreferrer" 
            aria-label="LinkedIn Profile"
            className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#ff2a2a] hover:border-white hover:scale-110 hover:shadow-[0_0_30px_rgba(255,42,42,0.5)] transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
          >
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-xs font-bold tracking-wider uppercase rounded text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
              LinkedIn
            </span>
          </a>
          <a 
            href="mailto:abhikmukherjee2003@gmail.com" 
            aria-label="Email Me"
            className="w-20 h-20 rounded-full border-2 border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#ff2a2a] hover:border-white hover:scale-110 hover:shadow-[0_0_30px_rgba(255,42,42,0.5)] transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-black/90 border border-white/10 text-xs font-bold tracking-wider uppercase rounded text-white opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md">
              Email Me
            </span>
          </a>
        </div>        {/* Lighter Glassmorphic Contact Card & Form Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-white/95 border-t border-l border-white/30 backdrop-blur-xl w-full md:w-[85%] lg:w-[75%] p-8 md:p-16 text-black flex flex-col justify-between rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none shadow-[0_30px_60px_rgba(0,0,0,0.4)] animate-gpu"
        >
          {/* Professional Introduction Section */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            {/* Availability Badge */}
            <div className="inline-flex items-center border border-[#ff2a2a]/30 bg-[#ff2a2a]/10 px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2a2a] animate-pulse mr-2" />
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#ff2a2a] uppercase">
                AVAILABLE FOR WORK
              </span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-black leading-tight mb-4 tracking-tight">
              Get In Touch
            </h2>
            <p className="text-base md:text-lg font-medium max-w-3xl leading-relaxed text-slate-600 mb-12">
              Let's build something amazing together. Whether it's a freelance project, internship opportunity, startup idea, collaboration, or full-time software role, I'd love to hear from you.
            </p>
 
            {/* Premium Contact Info Cards */}
            <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {/* Email Card */}
              <motion.a 
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                href="mailto:abhikmukherjee2003@gmail.com" 
                className="bg-slate-50/50 border border-slate-200/80 hover:border-[#ff2a2a]/40 hover:bg-[#ff2a2a]/5 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,42,42,0.08)] group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-[#ff2a2a] transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase mb-1">Email</p>
                  <p className="text-sm md:text-base font-bold text-black break-all">abhikmukherjee2003@gmail.com</p>
                </div>
              </motion.a>

              {/* Phone Card */}
              <motion.a 
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                href="tel:+918116343064" 
                className="bg-slate-50/50 border border-slate-200/80 hover:border-[#ff2a2a]/40 hover:bg-[#ff2a2a]/5 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,42,42,0.08)] group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-[#ff2a2a] transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase mb-1">Phone</p>
                  <p className="text-base font-bold text-black">+91 8116343064</p>
                </div>
              </motion.a>

              {/* Location Card */}
              <motion.div 
                variants={itemVariants}
                className="bg-slate-50/50 border border-slate-200/80 p-6 rounded-2xl flex flex-col gap-4 hover:shadow-[0_10px_25px_rgba(0,0,0,0.05)] transition-shadow duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase mb-1">Location</p>
                  <p className="text-base font-bold text-black">West Bengal, India</p>
                </div>
              </motion.div>

              {/* LinkedIn Card */}
              <motion.a 
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                href="https://www.linkedin.com/in/abhik-mukherjee-b6a15920a" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-slate-50/50 border border-slate-200/80 hover:border-[#ff2a2a]/40 hover:bg-[#ff2a2a]/5 backdrop-blur-md p-6 rounded-2xl flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_10px_35px_rgba(255,42,42,0.08)] group focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-[#ff2a2a] group-hover:text-white group-hover:border-[#ff2a2a] transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-slate-500 font-semibold tracking-wider uppercase mb-1">LinkedIn</p>
                  <p className="text-sm md:text-base font-bold text-black flex items-center gap-1">
                    View Profile 
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Mobile Social Bar */}
          <motion.div variants={itemVariants} className="flex md:hidden items-center justify-center gap-6 mb-8 w-full border-t border-slate-200/50 pt-8">
            <a 
              href="https://github.com/Abhik-08" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="GitHub Profile"
              className="w-20 h-20 rounded-full border-2 border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-800 hover:bg-[#ff2a2a] hover:text-white hover:border-[#ff2a2a] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,42,42,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.197 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/in/abhik-mukherjee-b6a15920a" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="LinkedIn Profile"
              className="w-20 h-20 rounded-full border-2 border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-800 hover:bg-[#ff2a2a] hover:text-white hover:border-[#ff2a2a] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,42,42,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
            >
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a 
              href="mailto:abhikmukherjee2003@gmail.com" 
              aria-label="Email Me"
              className="w-20 h-20 rounded-full border-2 border-slate-200 bg-slate-50/50 flex items-center justify-center text-slate-800 hover:bg-[#ff2a2a] hover:text-white hover:border-[#ff2a2a] hover:scale-110 hover:shadow-[0_0_15px_rgba(255,42,42,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff2a2a]"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>

          {/* Contact Form */}
          <motion.form variants={containerVariants} onSubmit={handleSubmit} className="flex flex-col gap-12 md:gap-16 w-full" noValidate>
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 w-full">
              {/* Left Column */}
              <motion.div variants={itemVariants} className="flex-1 flex flex-col gap-10">
                {/* Name Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder=" " 
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`peer w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-slate-300'} pb-3 pt-6 text-lg text-black focus:outline-none focus:border-[#ff2a2a] transition-all placeholder-transparent font-medium rounded-none hover:border-slate-400`}
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-0 top-6 text-slate-500 text-lg transition-all duration-300 pointer-events-none
                               peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-500
                               peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#ff2a2a]
                               peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#ff2a2a]"
                  >
                    Your Name
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff2a2a] transition-all duration-300 peer-focus:w-full"></div>
                  {errors.name && <span id="name-error" className="absolute -bottom-6 left-0 text-xs md:text-sm font-bold text-red-500">{errors.name}</span>}
                </div>

                {/* Company Input */}
                <div className="relative group">
                  <input 
                    type="text" 
                    id="company" 
                    value={formData.company}
                    onChange={handleChange}
                    placeholder=" " 
                    className="peer w-full bg-transparent border-b border-slate-300 pb-3 pt-6 text-lg text-black focus:outline-none focus:border-[#ff2a2a] transition-all placeholder-transparent font-medium rounded-none hover:border-slate-400"
                  />
                  <label 
                    htmlFor="company" 
                    className="absolute left-0 top-6 text-slate-500 text-lg transition-all duration-300 pointer-events-none
                               peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-500
                               peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#ff2a2a]
                               peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#ff2a2a]"
                  >
                    Company / Organization
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff2a2a] transition-all duration-300 peer-focus:w-full"></div>
                </div>

                {/* Email Input */}
                <div className="relative group">
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder=" " 
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`peer w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-slate-300'} pb-3 pt-6 text-lg text-black focus:outline-none focus:border-[#ff2a2a] transition-all placeholder-transparent font-medium rounded-none hover:border-slate-400`}
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-0 top-6 text-slate-500 text-lg transition-all duration-300 pointer-events-none
                               peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-500
                               peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#ff2a2a]
                               peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#ff2a2a]"
                  >
                    Your Email Address
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff2a2a] transition-all duration-300 peer-focus:w-full"></div>
                  {errors.email && <span id="email-error" className="absolute -bottom-6 left-0 text-xs md:text-sm font-bold text-red-500">{errors.email}</span>}
                </div>
              </motion.div>

              {/* Right Column */}
              <motion.div variants={itemVariants} className="flex-1 flex flex-col">
                <div className="relative h-full flex flex-col group">
                  <textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder=" " 
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={`peer w-full h-full min-h-[150px] bg-transparent border-b ${errors.message ? 'border-red-500' : 'border-slate-300'} pb-3 pt-6 text-lg text-black focus:outline-none focus:border-[#ff2a2a] transition-all placeholder-transparent font-medium resize-none rounded-none hover:border-slate-400`}
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className="absolute left-0 top-6 text-slate-500 text-lg transition-all duration-300 pointer-events-none
                               peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-placeholder-shown:text-slate-500
                               peer-focus:top-1 peer-focus:text-sm peer-focus:text-[#ff2a2a]
                               peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-[#ff2a2a]"
                  >
                    Tell me about your project, opportunity, or idea...
                  </label>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ff2a2a] transition-all duration-300 peer-focus:w-full"></div>
                  {errors.message && <span id="message-error" className="absolute -bottom-6 left-0 text-xs md:text-sm font-bold text-red-500">{errors.message}</span>}
                </div>
              </motion.div>
            </div>

            {/* Bottom Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-8 mt-4 items-center md:items-end justify-between w-full border-t border-slate-200/50 pt-8">
              {/* Direct message text */}
              <div className="flex-1 text-base text-slate-500 font-medium max-w-[400px]">
                <p className="leading-relaxed">
                  You can also contact me directly through email, phone, or LinkedIn for faster communication.
                </p>
              </div>

              {/* Submit Button */}
              <div className="w-full md:w-auto flex justify-end">
                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full md:w-auto px-8 py-4 bg-black border-2 border-black rounded-full text-white font-bold text-base transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_0_25px_rgba(255,42,42,0.4)] hover:bg-[#ff2a2a] hover:border-[#ff2a2a] hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-[#ff2a2a] focus:ring-offset-2 focus:ring-offset-white flex items-center justify-center gap-3 relative group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {renderButtonContent()}
                </button>
              </div>
            </motion.div>
          </motion.form>

        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-8 right-6 md:right-12 z-50 pointer-events-none"
          >
            <div className={`px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border backdrop-blur-lg flex items-center gap-3 ${
              toast.type === 'success' 
                ? 'bg-black/90 border-green-500/40 text-white' 
                : 'bg-black/90 border-[#ff2a2a]/40 text-white'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                toast.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-[#ff2a2a]'
              }`}>
                {toast.type === 'success' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider">
                  {toast.type === 'success' ? 'Success' : 'Error'}
                </p>
                <p className="text-sm font-semibold tracking-wide text-white">{toast.message}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
