import { motion } from "framer-motion";
import { styles } from "../style";
import MacBookComputer from "./canvas/Computers";
import ParticleBackground from "./ParticleBackground";


const Hero = () => {
    return ( 
        <section className="relative w-full h-screen mx-auto overflow-hidden">
            {/* Particle Background */}
            <div className="bg-[#000000] absolute inset-0 w-full h-full overflow-hidden z-0">
                <ParticleBackground />
            </div>
           
            {/* Content Container */}
            <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}>
                {/* Text Content */}
                <div className="flex-1 mb-2">
                    <motion.h1 
                        className={`${styles.heroHeadText} text-white`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Hi, I'm <span className="text-white">Eyob Teshome</span>
                    </motion.h1>
                    
                    <motion.p 
                        className={`${styles.heroSubText} mt-4 text-white-100 leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        A Fullstack Developer<br className="sm:block hidden"/> 
                        specializing in scalable, efficient solutions
                    </motion.p>
                </div>
            </div>

            {/* 3D Model and Scroll Indicator */}
            <div className="absolute inset-0 w-full h-full right-0 z-20">
                <MacBookComputer />
                
                {/* Scroll Indicator */}
                <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-40">
                    <a href="#about" aria-label="Scroll to about section">
                        <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                            <motion.div
                                animate={{ 
                                    y: [0, 24, 0]
                                }}
                                transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'loop'
                                }}
                                className="w-3 h-3 rounded-full bg-secondary"
                            />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
 
export default Hero;
