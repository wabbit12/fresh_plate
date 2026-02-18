import React from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

const VideoSection = () => {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
      className="flex-shrink-0 w-full md:w-[320px] lg:w-[380px] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl overflow-hidden"
    >
      <div className="h-full min-h-[140px] bg-gradient-to-r from-blue-500 to-blue-600 p-6 flex items-center justify-between gap-4 shadow-xl">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-lg md:text-xl mb-1">
            Watch Video How To Make It
          </h3>
          <p className="text-white/90 text-sm">
            See how to make it step by step...
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center cursor-pointer flex-shrink-0 shadow-lg"
        >
          <Play className="text-white fill-white ml-1" size={28} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default VideoSection
