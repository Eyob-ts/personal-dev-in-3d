import { motion } from "framer-motion";
import {
  javascript,
  reactjs,
  redux,
  tailwind,
  docker,
  nodejs,
  mongodb,
  threejs,
  git,
  figma,
  laravel,
  redis

} from "../assets";

const technologies = [
  { name: "JavaScript", icon: javascript, category: "frontend" },
  { name: "React JS", icon: reactjs, category: "frontend" },
  { name: "Redux Toolkit", icon: redux, category: "frontend" },
  { name: "Tailwind CSS", icon: tailwind, category: "frontend" },
  { name: "Three JS", icon: threejs, category: "frontend" },
  { name: "Laravel", icon: laravel, category: "backend" }, // Docker as placeholder
  { name: "Node JS", icon: nodejs, category: "backend" },
  { name: "MongoDB", icon: mongodb, category: "backend" },
  { name: "Graphql", icon: figma, category: "backend" }, // Figma as placeholder
  { name: "git", icon: git, category: "tool" },
  { name: "Docker", icon: docker, category: "tool" },
  { name: "caching Redis", icon: redis, category: "tool" },

];

const floatAnim = (index) => ({
  animate: {
    y: [0, -10, 0],
    transition: {
      delay: index * 0.05,
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
});

const TechCard = ({ title, techs, colorFrom, colorTo, glow }) => (
  <div className="mb-16">
    <motion.h3
      className="text-2xl font-mono text-white mb-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <span
        className={`text-transparent bg-clip-text bg-gradient-to-r ${colorFrom} ${colorTo}`}
      >
        {title}
      </span>
    </motion.h3>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 sm:p-8 justify-items-center">
      {techs.map((tech, index) => (
        <motion.div
          key={tech.name}
          className={`
            group p-6 w-full rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-lg shadow-black/30
            hover:scale-105 hover:shadow-xl
            transition-all duration-500 ease-out
          `}
          variants={floatAnim(index)}
          initial="initial"
          animate="animate"
          whileHover={{
            scale: 1.15,
            y: -15,
            transition: { duration: 0.3, type: "spring" },
          }}
        >
          <div className="relative">
            <img
              src={tech.icon}
              alt={tech.name}
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
            />
            <div
              className={`absolute inset-0 ${glow.bg} rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100`}
            />
          </div>
          <motion.p
            className="text-white/80 text-center mt-3 text-xs sm:text-sm font-medium group-hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
          >
            {tech.name}
          </motion.p>
        </motion.div>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  const frontendTech = technologies.filter(
    (tech) => tech.category === "frontend"
  );
  const backendTech = technologies.filter(
    (tech) => tech.category === "backend"
  );
  const toolTech = technologies.filter(
    (tech) => tech.category === "tool");

  return (
    <div className="relative overflow-hidden">
      {/* glowing gradient blobs in background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-[200px] right-20 w-80 h-80 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* content */}
      <section className="relative py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-mono text-white mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            🚀 Tech Stack
          </span>
        </motion.h2>

        <TechCard
          title="Frontend"
          techs={frontendTech}
          colorFrom="from-purple-400"
          colorTo="to-pink-500"
          glow={{
            border: "border-purple-400/30",
            shadow: "shadow-[0_0_30px_#ff00ff33]",
            bg: "bg-purple-400/10",
          }}
        />

        <TechCard
          title="Backend"
          techs={backendTech}
          colorFrom="from-amber-400"
          colorTo="to-orange-500"
          glow={{
            border: "border-amber-400/30",
            shadow: "shadow-[0_0_30px_#ffaa0033]",
            bg: "bg-amber-400/10",
          }}
        />
        <TechCard
          title="DevOps & Tools"
          techs={toolTech}
          colorFrom="from-amber-400"
          colorTo="to-orange-500"
          glow={{
            border: "border-amber-400/30",
            shadow: "shadow-[0_0_30px_#ffaa0033]",
            bg: "bg-amber-400/10",
          }}
        />
      </section>
    </div>
  );
};

export default TechStack;
