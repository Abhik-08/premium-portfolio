import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import ExpertiseSection from './components/ExpertiseSection'
import Skills from './components/Skills'
import Services from './components/Services'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

function ScrollSection({ children }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Previous section gently fades to 95% opacity
  const opacity = useTransform(scrollYProgress, [0.5, 0.85], [1, 0.95])

  return (
    <motion.div ref={ref} style={{ opacity }} className="scroll-section-wrapper">
      {children}
    </motion.div>
  )
}

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired
}

function App() {
  return (
    <>
      <Preloader />
      <Navbar />
      <ScrollSection>
        <Hero />
      </ScrollSection>
      <ScrollSection>
        <About />
      </ScrollSection>
      <ScrollSection>
        <Education />
      </ScrollSection>
      <ScrollSection>
        <ExpertiseSection />
      </ScrollSection>
      <ScrollSection>
        <Skills />
      </ScrollSection>
      <ScrollSection>
        <Services />
      </ScrollSection>
      <ScrollSection>
        <Certifications />
      </ScrollSection>
      <ScrollSection>
        <Contact />
      </ScrollSection>
    </>
  )
}

export default App

