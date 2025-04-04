import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../style";
import {services} from "../constants";
import {fadeIn, textVariant} from '../utils/motion'
import { SectionWrapper } from "../hoc";
import ParticleBackground from "./ParticleBackground";



const ServiceCard =({index, title, icon})=>{
    return (
        <Tilt className="xs:w-[250px] w-full">
            <motion.div
            variants={fadeIn ("right", "spring", 0.5 * index, 0.75 )}
            >
                <div
                options={{ 
                    max: 45,
                    scale: 1.05,
                    speed: 450,
                 }}
                 className="bg-tertiary  rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
                >
                    <img src={icon} alt={title}
                    className="w-16 h-16 object-contain "
                    />
                    <h3 className="text-white text-[20px] font-bold text-center ">
                        {title}

                    </h3>


                </div>
            </motion.div>


        </Tilt>
    )
}
const About = () => {
    return ( 
        <>
        <div className="relative z-1">

        <ParticleBackground/>
        </div>
        
        <motion.div>
            <p className={styles.sectionSubText}>
                Introduction</p>
                <h2 className={styles.sectionHeadText}>
                    OverView.
                </h2>
        </motion.div>
        <motion.p 
        variants={fadeIn("","", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-x-3xl leading-[30px]"
        >
            Recent Information Systems graduate skilled in full-stack web development, 
            with experience in creating responsive and user-friendly applications.
             Combines technical expertise with strong communication and problem-solving abilities to deliver tailored solutions. 
             Highly adaptable to new technologies, with a proven ability to quickly learn and integrate emerging tools and frameworks to stay ahead in a rapidly evolving tech landscape.
              Eager to contribute to a collaborative team environment and leverage teamwork to drive project success.
            
        </motion.p>
        <div className="mt-20 flex flex-wrap gap-10">
            
            {services.map((service, index)=>(
                <ServiceCard key={service.title} index={index} {...service}/>
            ))}

        </div>
        </>
     );
}
 
export default SectionWrapper(About, "about");