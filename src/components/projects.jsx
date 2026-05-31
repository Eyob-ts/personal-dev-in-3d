"use client"

import { motion } from "framer-motion"
import { styles } from "../style"
import { projects } from "../constants"
import { SectionWrapper } from "../hoc"
import { textVariant, fadeIn } from "../utils/motion"
import { github } from "../assets"
import Magnetic from "./ui/Magnetic"
import TiltCard from "./ui/TiltCard"

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <TiltCard
        maxRotation={5}
        scale={1.018}
        className={`
          group relative p-5 rounded-2xl sm:w-[360px] w-full h-full
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          shadow-lg shadow-black/40
          hover:shadow-xl hover:shadow-cyan-500/30
          transition-all duration-500
          overflow-hidden
        `}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--tilt-x,50%)_var(--tilt-y,50%),rgba(255,255,255,0.16),transparent_34%)]" />
        {/* Water droplets overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large water droplets */}
          <div className="absolute top-4 left-6 w-3 h-3 bg-white/20 rounded-full blur-[1px] animate-pulse" />
          <div className="absolute top-12 right-8 w-2 h-2 bg-white/15 rounded-full blur-[0.5px]" />
          <div
            className="absolute top-20 left-12 w-4 h-4 bg-white/10 rounded-full blur-[1px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-16 right-6 w-2.5 h-2.5 bg-white/20 rounded-full blur-[0.5px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-white/25 rounded-full blur-[0.5px]" />

          {/* Small condensation droplets */}
          <div className="absolute top-8 right-12 w-1 h-1 bg-white/30 rounded-full" />
          <div className="absolute top-16 left-4 w-0.5 h-0.5 bg-white/40 rounded-full" />
          <div className="absolute bottom-12 right-4 w-1 h-1 bg-white/25 rounded-full" />
          <div className="absolute bottom-20 left-16 w-0.5 h-0.5 bg-white/35 rounded-full" />

          {/* Streaking water effect */}
          <div className="absolute top-6 right-4 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-[0.5px]" />
          <div className="absolute top-14 left-8 w-0.5 h-6 bg-gradient-to-b from-white/15 to-transparent rounded-full blur-[0.5px]" />
        </div>

        {/* Enhanced frosted glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-white/[0.03] pointer-events-none" />

        {/* Subtle distortion effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_40%)] pointer-events-none" />

        {/* Project Image */}
        <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
          <img
            src={project.image || "/placeholder.svg"}
            alt={project.name}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
          />
          {/* GitHub Button */}
          <div className="absolute inset-0 flex justify-end m-3">
            <Magnetic
              as="button"
              type="button"
              strength={5}
              radius={120}
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer
              bg-black/40 backdrop-blur-md border border-white/20
              hover:bg-cyan-500/20 transition-all duration-300"
            >
              <img src={github || "/placeholder.svg"} alt="github" className="w-1/2 h-1/2 object-contain" />
            </Magnetic>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-5 relative z-10">
          <h3 className="text-white font-bold text-[22px] transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500">
            {project.name}
          </h3>
          <p className="mt-2 text-gray-300 text-[14px] font-mono leading-relaxed">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2 relative z-10">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className={`
                text-[12px] font-mono px-2 py-1 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                text-gray-200 hover:border-cyan-400 transition-all duration-300
                ${tag.color}
              `}
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <>
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <motion.h2
          className={styles.sectionHeadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Projects</span>
        </motion.h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-gray-400 text-[17px] max-w-3xl leading-[30px] font-mono"
        >
          Following projects showcase my skills and experience through real-world examples of my work. Each project is
          briefly described with links to code repositories. It reflects my ability to solve complex problems, work with
          different technologies, and manage projects effectively.
        </motion.p>
      </div>

      {/* Project Cards */}
      <div className="mt-20 flex flex-wrap gap-7 justify-center relative">
        {/* Background glow like your image */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse" />

        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} project={project} />
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(Projects, "projects")
