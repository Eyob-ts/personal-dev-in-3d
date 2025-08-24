import { motion } from "framer-motion";
import { styles } from "../style";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { Tilt } from "react-tilt";
import { github } from "../assets";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 25,
          scale: 1.05,
          speed: 450,
        }}
        className={`
          relative p-5 rounded-2xl sm:w-[360px] w-full h-full
          bg-white/10 backdrop-blur-xl
          border border-white/20
          shadow-lg shadow-black/40
          hover:shadow-xl hover:shadow-cyan-500/30
          transition-all duration-500
        `}
      >
        {/* Project Image */}
        <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
          />
          {/* GitHub Button */}
          <div className="absolute inset-0 flex justify-end m-3">
            <div
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer
              bg-black/40 backdrop-blur-md border border-white/20
              hover:bg-cyan-500/20 transition-all duration-300"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-5">
          <h3 className="text-white font-bold text-[22px] transition-all duration-500 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500">
            {project.name}
          </h3>
          <p className="mt-2 text-gray-300 text-[14px] font-mono leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
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
      </Tilt>
    </motion.div>
  );
};

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Projects
          </span>
        </motion.h2>
      </motion.div>

      {/* Description */}
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-gray-400 text-[17px] max-w-3xl leading-[30px] font-mono"
        >
          Following projects showcase my skills and experience through real-world
          examples of my work. Each project is briefly described with links to
          code repositories. It reflects my ability to solve complex problems,
          work with different technologies, and manage projects effectively.
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
  );
};

export default SectionWrapper(Projects, "projects");
