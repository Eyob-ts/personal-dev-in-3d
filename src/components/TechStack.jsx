// components/TechStack.jsx
import { technologies } from "../constants";
import { motion } from "framer-motion";

const floatAnim = (index) => ({
  initial: { y: 0, opacity: 0 },
  animate: {
    y: [0, -10, 0],
    opacity: 1,
    transition: {
      delay: index * 0.05,
      duration: 2 + Math.random() * 1, // Varied duration for organic feel
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});

const TechStack = () => {
  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-4 sm:p-8 justify-items-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            className="group p-4 w-full rounded-xl bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a] hover:from-[#0000] hover:to-[#0000] border border-transparent hover:border-cyan-400/30 hover:shadow-[0_0_30px_#00ffff33] transition-all duration-500 ease-out"
            variants={floatAnim(index)}
            initial="initial"
            animate="animate"
            whileHover={{ 
              scale: 1.15,
              y: -15,
              transition: { duration: 0.3, type: "spring" }
            }}
          >
            <div className="relative">
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain mx-auto group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-cyan-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
            </div>
            <motion.p 
              className="text-white/80 text-center mt-3 text-xs sm:text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {tech.name}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;