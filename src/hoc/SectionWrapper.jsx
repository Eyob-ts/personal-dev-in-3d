import { motion } from "framer-motion";
import { styles } from "../style";
import { staggerContainer } from "../utils/motion";

const SectionWrapper = (Component, idName) => 
  function HOC() {
    return ( // ✅ Added return statement here
      <motion.section 
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        id={idName} // ✅ Ensure ID is applied correctly
      >
        <span className="hash-span "
        id={idName}>
           
            

        </span>
        <Component />
      </motion.section>
    );
  };

export default SectionWrapper;
