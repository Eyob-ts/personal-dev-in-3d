"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF } from "@react-three/drei"

// 3D Model Component - Temporarily disabled due to unavailable model URL
// const ChairModel = () => {
//   const { scene } = useGLTF(
//     "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
//   );

//   return (
//     <primitive 
//       object={scene} 
//       scale={0.8}
//       position={[0, -1, 0]}
//       rotation={[0, -Math.PI / 4, 0]}
//     />
//   );
// };

const ContactForm = () => {
  const formRef = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await emailjs.sendForm(
        "service_puo8d8q",
        "template_gr068hc",
        formRef.current,
        "sEK5G4FYJ3Mg7Efas"
      )
      setIsSent(true)
      setTimeout(() => setIsSent(false), 3000)
    } catch (error) {
      alert("Failed to send: " + error.text)
    } finally {
      setIsLoading(false)
      e.target.reset()
    }
  }

  return (
    <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
      {/* 3D Model Section - Temporarily disabled due to unavailable model */}
      <div className="h-80 lg:h-[500px] rounded-xl overflow-hidden relative group bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        {/* Placeholder for 3D Model */}
        <div className="text-center text-white/60">
          <div className="text-6xl mb-4">🪑</div>
          <p className="text-sm font-mono">3D Model Temporarily Unavailable</p>
          <p className="text-xs mt-2 text-white/40">Check back soon for interactive 3D content</p>
        </div>

        {/* Glass border effect ONLY - No blur on the content */}
        <div className="absolute inset-0 border-2 border-white/20 rounded-xl pointer-events-none"></div>

        {/* Water droplets - Only on the very edges */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1 left-1 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute top-1 right-1 w-2 h-2 bg-white/15 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-1 left-1 w-1 h-1 bg-white/25 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-white/20 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Contact Form with Full Sweaty Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-xl"
      >
        {/* Sweaty Glass Background for Form */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-700/80 backdrop-blur-md border border-white/10">
          {/* Water droplets */}
          <div
            className="absolute top-6 right-8 w-1 h-1 bg-white/20 rounded-full blur-[0.5px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-12 left-6 w-1.5 h-1.5 bg-white/15 rounded-full blur-[0.5px] animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-20 left-12 w-1 h-1 bg-white/25 rounded-full blur-[0.5px] animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        <div className="relative z-10 p-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Let's Collaborate
          </h2>

          <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
            <div className="space-y-1">
              <label className="text-white/80 text-sm font-mono">Your Name</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/10 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/80 text-sm font-mono">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/10 transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-white/80 text-sm font-mono">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg p-3 text-white placeholder-white/50 focus:border-cyan-400 focus:bg-white/10 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`mt-4 py-3 px-6 rounded-lg font-mono transition-all relative overflow-hidden ${
                isLoading
                  ? "bg-white/10 cursor-not-allowed text-white/50"
                  : "bg-gradient-to-r from-cyan-400 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 text-white"
              }`}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <span className="relative z-10">{isLoading ? "Sending..." : isSent ? "✓ Sent!" : "Send Message"}</span>
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

// Preload the model for better performance
useGLTF.preload(
  "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/chair-wood/model.gltf"
);

export default ContactForm