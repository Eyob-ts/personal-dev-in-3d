import { motion } from "framer-motion";
import { styles } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-[#915EFF]">
      {/* Timeline dot */}
      <div className="absolute w-4 h-4 rounded-full bg-[#915EFF] -left-2 top-1" />
      
      {/* Content */}
      <div className="bg-gray-900 hover:border-white hover:bg-black hover:scale-90 hover:duration-150 border-2 border-[#915EFF] p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: experience.iconBg }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-[100%] h-[100%] object-contain rounded-full"
            />
          </div>
          <div>
            <h3 className="text-white text-xl font-Merriweather">{experience.title}</h3>
            <p className="text-secondary">{experience.company_name}</p>
          </div>
        </div>
        <p className="text-gray-400 mb-2 font-mono">{experience.date}</p>
        <ul className="list-disc pl-5 space-y-2">
          {experience.points.map((point, i) => (
            <li key={i} className="text-white-100 text-sm font-mono">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>

      <div className="mt-20 space-y-8">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} experience={exp} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");