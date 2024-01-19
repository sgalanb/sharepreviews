'use client'

import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <motion.div
      className="flex min-h-full flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <span className="text-4xl font-bold">404</span>
      <span className="pt-4">This page could not be found.</span>
      <span className="pt-2">But it still has a nice preview 😉.</span>
    </motion.div>
  )
}
