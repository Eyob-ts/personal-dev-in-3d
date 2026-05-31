
import { BrowserRouter } from "react-router-dom";
import { ExperienceProvider } from "./app/providers/ExperienceProvider";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Projects from "./components/projects";
import ChatWidget from "./components/ChatWidget";

const App = () => {
  return (
    <ExperienceProvider>
      <BrowserRouter>
        <div className="relative z-0 bg-[#000000]">
          <div className="bg-cover bg-no-repeat bg-center">
              <Hero />
          </div>

          <About />
          <Experience />
          <TechStack />
          <Projects />

          <div className="relative z-0">
            <Contact />
            <ChatWidget />
          </div>
        </div>
      </BrowserRouter>
    </ExperienceProvider>
  );
};

export default App;
