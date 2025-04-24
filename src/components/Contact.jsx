import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 3D Model Component
const ChairModel = () => {
  const { scene } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
  );

  return (
    <primitive 
      object={scene} 
      scale={0.8}
      position={[0, -1, 0]}
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
};

const ContactForm = () => {
  const formRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        "service_puo8d8q",
        "template_gr068hc",
        formRef.current,
        "sEK5G4FYJ3Mg7Efas"
      );
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    } catch (error) {
      alert("Failed to send: " + error.text);
    } finally {
      setIsLoading(false);
      e.target.reset();
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* 3D Model Section with Interactive Tooltip */}
      <div className="h-80 lg:h-[500px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <Canvas
          camera={{ position: [3, 2, 5], fov: 50 }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <directionalLight
            position={[0, 10, 0]}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <React.Suspense fallback={null}>
            <ChairModel />
          </React.Suspense>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={1.5}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>

        {/* Interactive Chair Tooltip */}
        <div className="group absolute bottom-4 left-4">
          <span className="text-gray-400 text-sm font-mono cursor-help border-b border-dashed border-gray-500 hover:text-[#915EFF] transition-colors">
            🪑 Why a chair?
          </span>
          <div className="hidden group-hover:block absolute bottom-full mb-2 p-3 bg-gray-900/90 backdrop-blur-sm text-xs rounded-lg border border-[#915EFF]/50 max-w-xs shadow-lg">
            <p className="mb-2">This isn't just any chair—it's a:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Metaphor for "taking a seat" to chat</li>
              <li>Reminder that good code needs solid foundations</li>
              <li>Subtle flex that I can load 3D models</li>
            </ul>
            <p className="mt-2 text-[10px] text-gray-400">
              (Real talk: The developer who made this model did amazing work)
            </p>
          </div>
        </div>

        {/* Original Rotation Instruction (now appears on right side) */}
        <div className="absolute bottom-4 right-4 text-gray-400 text-sm font-mono">
          Drag to rotate
        </div>
      </div>

      {/* Contact Form (unchanged) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-[#915EFF]/30 shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Let's Collaborate
        </h2>
        
        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-mono">Your Name</label>
            <input
              type="text"
              name="user_name"
              required
              className="w-full bg-gray-800 border border-[#915EFF]/30 rounded-lg p-3 text-white focus:border-amber-400 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-mono">Email</label>
            <input
              type="email"
              name="user_email"
              required
              className="w-full bg-gray-800 border border-[#915EFF]/30 rounded-lg p-3 text-white focus:border-amber-400 transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-300 text-sm font-mono">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full bg-gray-800 border border-[#915EFF]/30 rounded-lg p-3 text-white focus:border-amber-400 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`mt-4 py-3 px-6 rounded-lg font-mono transition-all ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-400 to-blue-600 hover:shadow-lg hover:shadow-amber-500/30"
            }`}
          >
            
            {isLoading ? "Sending..." : isSent ? "✓ Sent!" : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

// Preload the model for better performance
useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
);

export default ContactForm;