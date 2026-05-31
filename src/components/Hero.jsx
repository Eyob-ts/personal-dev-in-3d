import { motion } from "framer-motion";
import { styles } from "../style";
import HeroScene from "../experience/scenes/HeroScene";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden bg-[#020305]">
      <div className="absolute inset-0 z-0 opacity-90">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_35%,rgba(153,220,255,0.16),transparent_34%),linear-gradient(90deg,rgba(2,3,5,0.98)_0%,rgba(2,3,5,0.82)_36%,rgba(2,3,5,0.28)_100%)]" />

      <div
        className={`${styles.paddingX} relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center pb-24 pt-28`}
      >
        <motion.p
          className="mb-5 max-w-fit border-b border-white/20 pb-2 font-mono text-[13px] uppercase tracking-[0.28em] text-cyan-200/80"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Creative frontend and Three.js engineer
        </motion.p>

        <motion.h1
          className={`${styles.heroHeadText} max-w-4xl text-white`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          Eyob Teshome
        </motion.h1>

        <motion.p
          className={`${styles.heroSubText} mt-6 max-w-2xl text-white-100/90 leading-relaxed`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          I build fast, polished web experiences with React, Three.js, and performance-focused engineering.
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 justify-center">
        <a href="#about" aria-label="Scroll to about section">
          <div className="flex h-14 w-8 justify-center rounded-full border border-white/35 p-2">
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="h-2 w-2 rounded-full bg-cyan-100"
            />
            </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
