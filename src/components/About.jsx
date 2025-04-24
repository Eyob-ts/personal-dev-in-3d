import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import ParticleBackground from "./ParticleBackground";

const ServiceCard = ({ index, title, icon }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div variants={fadeIn("right", "spring", 0.5 * index, 0.75)}>
        <div
          options={{
            max: 45,
            scale: 1.05,
            speed: 450,
          }}
          className="bg-gray-900 hover:bg-black hover:border-2 hover:border-secondary font-mono rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain " />
          <h3 className="text-white text-[20px] font-mono text-center ">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <div className="relative z-1">
        <ParticleBackground />
      </div>

      <motion.div>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>OverView.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 2)}
        className="mt-4 text-secondary font-mono text-[17px] max-w-3xl leading-[30px]"
      >
        Hey there! I’m <span className="text-blue-400 font-serif">Eyob Teshome (Yob)</span>, your friendly neighborhood <span className="text-blue-400">full-stack web developer</span>! I whip up magic with the <span className="text-blue-300">MERN stack</span>, bring <span className="text-blue-400">3D models</span> to life using <span className="text-blue-400">Three.js</span>, and tame the robust <span className="text-blue-400">Laravel</span> framework like a pro. I graduated in <span className="text-accent">Information Systems</span>, and I’m all about crafting applications that are as stylish as they are functional.

        When I’m not busy coding, you’ll find me on a <span className="text-highlight">coffee walk ☕</span>—because let’s be real, great ideas brew best over a cup of delicious Ethiopian coffee! I thrive on the thrill of <span className="text-blue-500">responsibility</span>, always eager to tackle new challenges and make technology work wonders.

        So, if you’ve got wild web or app ideas, let’s join forces and turn them into reality!
      </motion.p>

      {/* Resume Button */}
      <div className="mt-6">
        <a
          href="https://flowcv.com/resume/s1sq8spobwkn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 mt-4 font-mono text-white border border-white bg-black rounded-md hover:shadow-[0_0_15px_rgba(255,255,255,0.6)] transition duration-300"
        >
          Download Resume
        </a>
      </div>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
