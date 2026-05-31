"use client"

import { motion } from "framer-motion"

import { styles } from "../style"
import { services } from "../constants"
import { fadeIn } from "../utils/motion"
import { SectionWrapper } from "../hoc"
import TiltCard from "./ui/TiltCard"

const ServiceCard = ({ index, title, icon }) => {
  return (
    <TiltCard maxRotation={4} scale={1.018} className="xs:w-[250px] w-full">
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)}>
        <div
          className="relative overflow-hidden bg-gradient-to-br from-blue-400/20 via-blue-600/20 to-blue-900/20 hover:from-blue-400/30 hover:via-blue-600/30 hover:to-blue-900/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] font-mono rounded-[20px] py-5 px-12 min-h-[190px] flex justify-evenly items-center flex-col transition-all duration-700 border border-white/10 backdrop-blur-xl before:absolute before:inset-0 before:bg-gradient-to-t before:from-white/5 before:to-transparent before:pointer-events-none glass-card"
        >
          {/* Subtle vertical streaks for glass effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/10 to-transparent"></div>
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`streak-${i}`}
                className="absolute w-0.5 bg-gradient-to-t from-white/30 to-white/10 rounded-full"
                style={{
                  left: `${5 + i * 6}%`,
                  bottom: `${(i % 4) + 1}px`,
                  height: `${20 + (i % 5) * 4}px`,
                  transform: `rotate(${-18 + (i % 7) * 6}deg)`,
                  opacity: 0.42 + (i % 3) * 0.08,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  left: `${12 + i * 14}%`,
                  top: `${18 + (i % 3) * 24}%`,
                }}
                animate={{
                  x: [0, 15, -10, 0],
                  y: [0, -10, 5, 0],
                  opacity: [0.3, 0.8, 0.2, 0.5],
                }}
                transition={{
                  duration: 4 + (i % 3) * 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: i * 0.6,
                }}
              />
            ))}
          </div>

          {/* Icon with glass bubble */}
          <div className="relative z-10 p-4 bg-white/20 backdrop-blur-lg rounded-full border border-white/30 shadow-lg">
            <img
              src={icon || "/placeholder.svg"}
              alt={title}
              className="w-16 h-16 object-contain filter brightness-110 drop-shadow-sm"
            />
          </div>

          {/* Title */}
          <h3 className="relative z-10 text-white text-[20px] font-mono text-center drop-shadow-md hover:text-blue-200 transition-colors duration-300">
            {title}
          </h3>
        </div>
      </motion.div>
    </TiltCard>
  );
};


const AboutComponent = () => {
  return (
    <>
      <motion.div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>OverView.</h2>
      </motion.div>

    <motion.p
  variants={fadeIn("", "", 0.1, 2)}
  className="mt-3 text-secondary font-mono text-[17px] max-w-full leading-[30px]"
>
 Hey there! I'm <span className="text-blue-400 font-serif">Eyob Teshome (Yob)</span>, a passionate{" "}
<span className="text-blue-400">full-stack developer</span> focused on building scalable and
high-performance web applications.

I work mainly with <span className="text-blue-300">Next js </span>, {" "}
<span className="text-blue-300">React (TypeScript)</span>, {" "}
<span className="text-blue-400">Three.js</span>, and{" "}
 <span className="text-blue-300">Laravel</span>,{" "}
developing complex systems including ERP platforms
and performance-intensive 3D web applications.

Recently, I’ve been diving deep into{" "}
<span className="text-blue-400">frontend performance engineering</span> — analyzing CPU and memory
usage, optimizing rendering pipelines, and improving stability in large-scale WebGL and PCB
applications. I enjoy solving tough technical problems and turning slow, heavy systems into smooth,
efficient experiences.

I’m also exploring how modern applications integrate with{" "}
<span className="text-blue-400">Artificial Intelligence</span>, learning about concepts like{" "}
<span className="text-blue-400">Model Context Protocol (MCP)</span> and how AI can enhance real-world
software systems.

When I’m not coding, you’ll probably find me on a{" "}
<span className="text-highlight">coffee walk ☕</span> — because great ideas (and great performance fixes)
usually start with Ethiopian coffee.

If you’re building something ambitious and need someone who cares about performance, scalability,
and clean architecture — let’s build it.

</motion.p>


      {/* Resume Button */}
      <div className="mt-6">
        <a
          href="https://flowcv.com/resume/s1sq8spobwkn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 mt-4 font-mono text-white border border-white/20 rounded-md hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition duration-300"
        >
          Download Resume
        </a>
      </div>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

      <style jsx global>{`
        .glass-card {
          background: rgba(107, 116, 119, 0.32);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .glass-card:hover {
          background: rgba(16, 123, 185, 0.3);
          box-shadow: 0 8px 32px 0 rgba(34, 124, 197, 0.5);
        }
      `}</style>
    </>
  )
}

const About = SectionWrapper(AboutComponent, "about")
export default About
