"use client"

import { Tilt } from "react-tilt"
import { motion } from "framer-motion"

import { styles } from "../style"
import { services } from "../constants"
import { fadeIn } from "../utils/motion"
import { SectionWrapper } from "../hoc"
import ParticleBackground from "./ParticleBackground"

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)}>
        <div
          options={{
            max: 45,
            scale: 1.05,
            speed: 450,
          }}
          className="relative overflow-hidden bg-gradient-to-br from-emerald-400/20 via-blue-500/20 to-blue-800/20 hover:from-emerald-400/30 hover:via-blue-500/30 hover:to-blue-800/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] font-mono rounded-[20px] py-5 px-12 min-h-[190px] flex justify-evenly items-center flex-col transition-all duration-700 border border-white/10 backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/5 before:to-transparent before:pointer-events-none glass-card"
        >
          {/* Subtle background pattern for glass effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`absolute bottom-${Math.floor(Math.random() * 4) + 1} w-0.5 bg-gradient-to-t from-white/30 to-white/10 rounded-full opacity-${40 + Math.floor(Math.random() * 30)}`}
                style={{
                  left: `${5 + i * 6}%`,
                  height: `${20 + Math.floor(Math.random() * 20)}px`,
                  transform: `rotate(${-20 + Math.floor(Math.random() * 40)}deg)`,
                }}
              />
            ))}
          </div>

          {/* Animated grass blades with glass effect */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute bottom-0 w-0.5 bg-gradient-to-t from-white/40 to-white/20 rounded-full origin-bottom`}
                style={{
                  left: `${10 + i * 10}%`,
                  height: `${25 + Math.floor(Math.random() * 15)}px`,
                }}
                animate={{
                  rotate: [0, 3 + Math.random() * 2, -2 - Math.random() * 2, 0],
                  scaleY: [1, 1.05, 0.98, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, 20, -10, 0],
                  y: [0, -15, 5, 0],
                  opacity: [0.4, 0.8, 0.2, 0.4],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.8,
                }}
              />
            ))}
          </div>

          {/* Icon container with glass effect */}
          <div className="relative z-10 p-4 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-lg">
            <img
              src={icon || "/placeholder.svg"}
              alt={title}
              className="w-16 h-16 object-contain filter brightness-110 drop-shadow-sm"
            />
          </div>

          {/* Title with text shadow for better readability on glass */}
          <h3 className="relative z-10 text-white text-[20px] font-mono text-center drop-shadow-md hover:text-green-100 transition-colors duration-300">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <div className="relative z-1">
        <ParticleBackground />
      </div>

      <motion.div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>OverView.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 2)}
        className="mt-3 text-secondary font-mono text-[17px] max-w-full leading-[30px]"
      >
        Hey there! I'm <span className="text-blue-400 font-serif">Eyob Teshome (Yob)</span>, your friendly neighborhood{" "}
        <span className="text-blue-400">full-stack web developer</span>! I whip up magic with the{" "}
        <span className="text-blue-300">MERN stack</span>, bring <span className="text-blue-400">3D models</span> to
        life using <span className="text-blue-400">Three.js</span>, and tame the robust{" "}
        <span className="text-blue-400">Laravel</span> framework like a pro. I graduated in{" "}
        <span className="text-accent">Information Systems</span>, and I'm all about crafting applications that are as
        stylish as they are functional. When I'm not busy coding, you'll find me on a{" "}
        <span className="text-highlight">coffee walk ☕</span>—because let's be real, great ideas brew best over a cup
        of delicious Ethiopian coffee! I thrive on the thrill of <span className="text-blue-500">responsibility</span>,
        always eager to tackle new challenges and make technology work wonders. So, if you've got wild web or app ideas,
        let's join forces and turn them into reality!
      </motion.p>

      {/* Resume Button */}
      <div className="mt-6">
        <a
          href="https://flowcv.com/resume/s1sq8spobwkn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 mt-4 font-mono text-white border border-white bg-black rounded-md hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition duration-300"
        >
          Download Resume
        </a>
      </div>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <style jsx>{`
        .glass-card {
          background: rgba(6, 95, 70, 0.25);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glass-card:hover {
          background: rgba(16, 185, 129, 0.3);
          box-shadow: 0 8px 32px 0 rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </>
  )
}

export default SectionWrapper(About, "about")