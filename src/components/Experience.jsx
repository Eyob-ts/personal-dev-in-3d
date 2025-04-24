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
      {/* Animated timeline */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-[#915EFF] to-transparent group-hover:via-[#00ffff] transition-all duration-500" />
      
      {/* Timeline dot with pulse animation */}
      <motion.div 
        className="absolute w-4 h-4 rounded-full bg-[#915EFF] -left-2 top-1 z-10"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: ["0 0 0 0 rgba(145, 94, 255, 0.7)", "0 0 0 10px rgba(145, 94, 255, 0)", "0 0 0 0 rgba(145, 94, 255, 0)"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content card */}
      <motion.div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 hover:from-black hover:to-gray-900 border border-[#915EFF]/30 hover:border-[#00ffff]/50 p-6 rounded-xl shadow-lg hover:shadow-[0_0_30px_#00ffff33] transition-all duration-500"
        whileHover={{
          y: -10,
          scale: 1.02
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center border border-[#915EFF]/50 group-hover:border-[#00ffff] transition-all duration-500"
            style={{ background: experience.iconBg }}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-[80%] h-[80%] object-contain"
            />
          </motion.div>
          <div>
            <h3 className="text-white text-xl font-bold font-Merriweather group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 transition-all duration-500">
              {experience.title}
            </h3>
            <p className="text-secondary text-sm font-mono">{experience.company_name}</p>
          </div>
        </div>
        
        <p className="text-gray-400 mb-4 font-mono text-sm flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#915EFF] group-hover:bg-[#00ffff] transition-all duration-500"></span>
          {experience.date}
        </p>
        
        <ul className="space-y-3">
          {experience.points.map((point, i) => (
            <motion.li 
              key={i} 
              className="text-gray-300 text-sm font-mono pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-[#915EFF] group-hover:before:text-[#00ffff] transition-all duration-500"
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