// import { BrowserRouter } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Feedbacks from "./components/Feedbacks";
// import Contact from "./components/Contact";
// import Experience from "./components/Experience";
// import MacBookComputer from "./components/canvas/Computers";

// const App = () => {
//   return ( 
//     <BrowserRouter>
//     <div className=" relative z-0 bg-primary">
//       <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
//         <Navbar/>
//         <Hero/>
        

//       </div>
//       <About/>
//       <Experience/>
//       <Feedbacks/>
//       <div className="relative z-0">
//          <Contact/>
         
//       </div>

//     </div>
//     </BrowserRouter>
//    );
// }
 
// export default App;

import { BrowserRouter } from "react-router-dom";
import { Suspense, useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Feedbacks from "./components/Feedbacks";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Loader from "./components/Loader"; // Import the SVG loader
import ParticleBackground from "./components/ParticleBackground";

//import TestParticles from "./components/TestParticles";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with actual loading logic)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
    
    <BrowserRouter>
      <div className="relative z-0 bg-primary">

        {loading ? ( // Show loader while loading
          <Loader />
        ) : (
          <>
              {/* <TestParticles/>  */}
            <div className=" bg-cover bg-no-repeat bg-center"> 
            
              <Navbar />
              <Hero />
            </div>
            
             
            <About />
            <Experience />
            <Feedbacks />
            
            <div className="relative z-0">
              <Contact />
            </div>
          </>
        )}
      </div>
    </BrowserRouter>
    </>
  );
};

export default App;
