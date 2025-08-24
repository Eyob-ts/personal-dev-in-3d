import { motion } from "framer-motion";
import { styles } from "../style";
import { experiences } from "../constants/index.js";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
  variants={fadeIn("right", "spring", index * 0.5, 0.75)}
  className="relative pl-8 pb-8 group"
>
  {/* Timeline line */}
  <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" />

  {/* Timeline dot */}
  <motion.div 
    className="absolute w-4 h-4 rounded-full bg-cyan-400 -left-2 top-1 z-10"
    animate={{
      scale: [1, 1.2, 1],
      boxShadow: [
        "0 0 0 0 rgba(34,211,238,0.6)",
        "0 0 0 10px rgba(34,211,238,0)",
        "0 0 0 0 rgba(34,211,238,0)"
      ]
    }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
  />

  {/* Glassy card */}
  <motion.div 
    className="relative overflow-hidden p-6 rounded-2xl border border-white/20 
               bg-white/10 backdrop-blur-md shadow-lg transition-all duration-500 
               hover:shadow-[0_0_40px_rgba(0,255,255,0.3)]"
    whileHover={{ y: -10, scale: 1.02 }}
  >
    {/* Condensation/fog overlay */}
    <div className="absolute inset-0 bg-[url('/fog-texture.png')] bg-cover opacity-20 pointer-events-none" />

    {/* Neon glow behind card */}
    <div className="absolute -top-20 -left-20 w-60 h-60 bg-pink-500 rounded-full blur-3xl opacity-20" />
    <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyan-400 rounded-full blur-3xl opacity-20" />

    {/* Content */}
    <div className="relative flex items-center gap-4 mb-4 z-10">
      <motion.div 
        className="w-12 h-12 rounded-full flex items-center justify-center 
                   border border-white/30 backdrop-blur-sm"
        style={{ background: experience.iconBg }}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
      >
        <img src={experience.icon} alt={experience.company_name} className="w-[80%] h-[80%] object-contain" />
      </motion.div>
      <div>
        <h3 className="text-white text-xl font-bold font-Merriweather 
                       bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">
          {experience.title}
        </h3>
        <p className="text-gray-300 text-sm font-mono">{experience.company_name}</p>
      </div>
    </div>

    <p className="text-gray-200 mb-4 font-mono text-sm flex items-center gap-2 relative z-10">
      <span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span>
      {experience.date}
    </p>

    <ul className="relative z-10 space-y-3">
      {experience.points.map((point, i) => (
        <motion.li 
          key={i}
          className="text-gray-100 text-sm font-mono pl-4 relative before:content-['▹'] 
                     before:absolute before:left-0 before:text-cyan-400"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          {point}
        </motion.li>
      ))}
    </ul>
  </motion.div>
</motion.div>

  );
};

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Work Experience
          </span>
        </motion.h2>
      </motion.div>

      <motion.div 
        className="mt-20 space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {experiences.map((exp, index) => (
          <ExperienceCard 
            key={`experience-${index}`} 
            experience={exp} 
            index={index} 
          />
        ))}
      </motion.div>
    </>
  );
};

export default SectionWrapper(Experience, "work");