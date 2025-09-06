"use client"

import { motion } from "framer-motion"
import { styles } from "../style"
import { experiences } from "../constants/index.js"
import { SectionWrapper } from "../hoc"
import { textVariant, fadeIn } from "../utils/motion"

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div variants={fadeIn("right", "spring", index * 0.5, 0.75)} className="relative pl-6 pb-6 group">
      {/* Enhanced Timeline line with glass effect */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent backdrop-blur-sm" />

      {/* Floating particles around timeline */}
      <div className="absolute left-[-10px] top-4 w-1 h-1 bg-cyan-400/60 rounded-full animate-pulse" />
      <div className="absolute left-[-6px] top-12 w-0.5 h-0.5 bg-pink-400/40 rounded-full animate-ping" />

      {/* Enhanced Timeline dot with glass effect */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 -left-1.5 top-2 z-10
                   border border-white/30 backdrop-blur-sm shadow-lg"
        animate={{
          scale: [1, 1.3, 1],
          boxShadow: ["0 0 0 0 rgba(34,211,238,0.8)", "0 0 0 8px rgba(34,211,238,0)", "0 0 0 0 rgba(34,211,238,0)"],
        }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <motion.div
        className="relative overflow-hidden p-4 rounded-xl border border-white/10 
                   bg-gradient-to-br from-white/5 via-white/10 to-white/5 
                   backdrop-blur-xl shadow-2xl transition-all duration-700 
                   hover:shadow-[0_8px_32px_rgba(0,255,255,0.15),0_0_0_1px_rgba(255,255,255,0.1)]
                   hover:border-white/20 w-full"
        whileHover={{
          y: -8,
          scale: 1.02,
          rotateX: 5,
          rotateY: 5,
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/40 via-transparent to-transparent" />

        <motion.div
          className="absolute top-2 right-4 w-2 h-2 bg-white/20 rounded-sm rotate-45"
          animate={{
            rotate: [45, 135, 45],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-4 left-6 w-1 h-1 bg-cyan-400/30 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-radial from-cyan-400/10 to-transparent rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-radial from-pink-400/10 to-transparent rounded-full blur-xl" />

        <div className="relative flex items-center gap-3 mb-3 z-10">
          <motion.div
            className="w-10 h-10 rounded-lg flex items-center justify-center 
                       border border-white/20 backdrop-blur-md bg-white/5
                       shadow-inner"
            style={{ background: `linear-gradient(135deg, ${experience.iconBg}40, ${experience.iconBg}20)` }}
            whileHover={{
              rotate: 360,
              scale: 1.1,
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img
              src={experience.icon || "/placeholder.svg"}
              alt={experience.company_name}
              className="w-6 h-6 object-contain"
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h3
              className="text-white text-lg font-bold font-sans truncate
                         bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-pink-300"
              whileHover={{ scale: 1.02 }}
            >
              {experience.title}
            </motion.h3>
            <p className="text-gray-300/80 text-xs font-medium truncate">{experience.company_name}</p>
          </div>
        </div>

        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full 
                     bg-white/5 border border-white/10 backdrop-blur-md relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-gray-200/90 text-xs font-medium">{experience.date}</span>
        </motion.div>

        <ul className="relative z-10 space-y-2">
          {experience.points.slice(0, 3).map((point, i) => (
            <motion.li
              key={i}
              className="text-gray-100/90 text-xs leading-relaxed pl-3 relative 
                         before:content-['▸'] before:absolute before:left-0 before:text-cyan-400/80
                         before:text-sm hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              whileHover={{ x: 2 }}
              transition={{
                delay: i * 0.1,
                duration: 0.3,
              }}
              viewport={{ once: true }}
            >
              {point.length > 80 ? `${point.substring(0, 80)}...` : point}
            </motion.li>
          ))}
          {experience.points.length > 3 && (
            <motion.div
              className="text-cyan-400/60 text-xs pl-3 font-medium"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              +{experience.points.length - 3} more achievements
            </motion.div>
          )}
        </ul>

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none
                     transform -skew-x-12"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My journey so far</p>
        <motion.h2
          className={styles.sectionHeadText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-400">
            Work Experience
          </span>
        </motion.h2>
      </motion.div>

      <motion.div
        className="mt-16 space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard key={`experience-${index}`} experience={exp} index={index} />
        ))}
      </motion.div>
    </>
  )
}

export default SectionWrapper(Experience, "work")
