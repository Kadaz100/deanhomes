'use client'

import { motion } from 'framer-motion'
import { Home as HomeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SplashPage() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleGetStarted = () => {
    router.push('/signup')
  }

  return (
    <div className="min-h-screen gradient-purple flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-white opacity-10"></div>
      
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 text-center px-4">
        {/* Home Icon Animation */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="mb-8"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <HomeIcon className="w-16 h-16 md:w-20 md:h-20 text-purple-800" />
            </div>
          </motion.div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-white">
              Dean Homes
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-white/90 font-light"
          >
            Your Perfect Home Awaits
          </motion.p>
        </motion.div>

        {/* Get Started Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 md:px-16 md:py-5 bg-white text-purple-800 rounded-2xl font-bold text-lg md:text-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 relative overflow-hidden"
          >
            <motion.span
              className="relative z-10"
              animate={isHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
            >
              Get Started
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-purple-600 opacity-0"
              animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
