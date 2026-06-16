import React from 'react';
import { motion } from 'framer-motion';
import './techstack.css';

const row1Technologies = [
  {
    name: 'HTML5 & CSS3',
    subtitle: 'CORE LAYOUT',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/html5/html5-original.svg',
  },
  {
    name: 'React.js',
    subtitle: 'FRONTEND LIBRARY',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/react/react-original.svg',
  },
  {
    name: 'Next.js',
    subtitle: 'REACT FRAMEWORK',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/nextjs/nextjs-original.svg',
  },
  {
    name: 'Tailwind CSS',
    subtitle: 'STYLING ENGINE',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'TypeScript',
    subtitle: 'TYPED JS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/typescript/typescript-original.svg',
  },
  {
    name: 'JavaScript',
    subtitle: 'SCRIPTING LANGUAGE',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Vite',
    subtitle: 'BUILD TOOL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/vitejs/vitejs-original.svg',
  },
  {
    name: 'Python',
    subtitle: 'SCRIPTING & AI',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/python/python-original.svg',
  },
  {
    name: 'Pandas',
    subtitle: 'DATA ANALYTICS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/pandas/pandas-original.svg',
  },
  {
    name: 'Scikit-learn',
    subtitle: 'MACHINE LEARNING',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/scikitlearn/scikitlearn-original.svg',
  },
  {
    name: 'OpenCV',
    subtitle: 'COMPUTER VISION',
    logo: 'https://www.vectorlogo.zone/logos/opencv/opencv-icon.svg',
  },
];

const row2Technologies = [
  {
    name: 'Node.js',
    subtitle: 'JS RUNTIME',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'Java',
    subtitle: 'BACKEND LANGUAGE',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/java/java-original.svg',
  },
  {
    name: 'Spring Boot',
    subtitle: 'ENTERPRISE JAVA',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/spring/spring-original.svg',
  },
  {
    name: 'Hibernate',
    subtitle: 'ORM ORM ORM',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/hibernate/hibernate-original.svg',
  },
  {
    name: 'n8n',
    subtitle: 'AI WORKFLOWS',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/n8n.svg',
  },
  {
    name: 'Gemini & LLMs',
    subtitle: 'COGNITIVE AI',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemini.svg',
  },
  {
    name: 'Groq',
    subtitle: 'LPU INFERENCE',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/groq.svg',
  },
  {
    name: 'OpenAI',
    subtitle: 'ARTIFICIAL AI',
    logo: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/openai.svg',
  },
  {
    name: 'Firebase',
    subtitle: 'DATABASE & AUTH',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/firebase/firebase-original.svg',
  },
  {
    name: 'Docker',
    subtitle: 'CONTAINERS',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/docker/docker-original.svg',
  },
  {
    name: 'AWS',
    subtitle: 'CLOUD PLATFORM',
    logo: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
  },
  {
    name: 'Linux',
    subtitle: 'OPERATING SYSTEM',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/linux/linux-original.svg',
  },
  {
    name: 'Git & GitHub',
    subtitle: 'VERSION CONTROL',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/git/git-original.svg',
  },
  {
    name: 'PostgreSQL',
    subtitle: 'RELATIONAL DB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'MySQL',
    subtitle: 'RELATIONAL DB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/mysql/mysql-original.svg',
  },
  {
    name: 'MongoDB',
    subtitle: 'DOCUMENT DB',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/mongodb/mongodb-original.svg',
  },
];

// Triplicate items to guarantee a seamless, infinite loop on large screens
const row1Items = [...row1Technologies, ...row1Technologies, ...row1Technologies];
const row2Items = [...row2Technologies, ...row2Technologies, ...row2Technologies];

const TechStack = () => {
  return (
    <div className="tech-stack-container mt-12" data-aos="fade-up" data-aos-delay="300">
      <div className="mb-8 px-6 md:px-12">
        <h3 className="text-2xl font-black text-black tracking-wide uppercase">
          Technologies I Work With
        </h3>
        <p className="text-sm font-semibold text-red-100 mt-1 max-w-2xl">
          Building full-stack, cloud-ready and AI-powered applications using modern technologies.
        </p>
      </div>

      {/* Row 1: Scrolls Left */}
      <div className="marquee-container">
        <div className="marquee-track-left">
          {row1Items.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="py-2 px-1"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3.5 + (index % 3) * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="tech-card-rect group">
                <div className="tech-icon-box">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="tech-logo-img-rect"
                    loading="lazy"
                  />
                </div>
                <div className="tech-info-box">
                  <h4 className="tech-title-rect">{tech.name}</h4>
                  <span className="tech-subtitle-rect">{tech.subtitle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolls Right */}
      <div className="marquee-container mt-2">
        <div className="marquee-track-right">
          {row2Items.map((tech, index) => (
            <motion.div
              key={`${tech.name}-${index}`}
              className="py-2 px-1"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3.8 + (index % 3) * 0.7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="tech-card-rect group">
                <div className="tech-icon-box">
                  <img
                    src={tech.logo}
                    alt={`${tech.name} logo`}
                    className="tech-logo-img-rect"
                    loading="lazy"
                  />
                </div>
                <div className="tech-info-box">
                  <h4 className="tech-title-rect">{tech.name}</h4>
                  <span className="tech-subtitle-rect">{tech.subtitle}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
