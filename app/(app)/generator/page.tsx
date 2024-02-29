'use client'

import { Button } from '@/app/ui/components/Button'
import { Separator } from '@/app/ui/components/Separator'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { v4 as uuid } from 'uuid'

export default function GeneratorPage() {
  return (
    <AnimatePresence>
      <motion.div
        className={`flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex w-full items-center justify-between">
          <span className="text-2xl">Your templates</span>
          <Button asChild>
            <Link href={`/generator/${uuid()}`}>New template</Link>
          </Button>
        </div>
        <Separator />
      </motion.div>
    </AnimatePresence>
  )
}
