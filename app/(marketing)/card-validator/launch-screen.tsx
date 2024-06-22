'use client'

import ValidatorInput from '@/app/ui/validator-input'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

export default function ValidatorLaunchScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex min-h-[calc(100dvh-72px)] w-full flex-col items-center justify-center gap-4 px-4">
          <div className="flex w-full flex-col items-center justify-start gap-4 py-8">
            <h1 className="marketing-title text-balance text-center">
              Social Card Validator
            </h1>
            <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-40">
              Check how your links look when shared. Validate that you have the
              right metatags in place so your cards are displayed correctly.
            </p>
          </div>
          <div className="mb-20 flex w-full flex-col items-center justify-start gap-4">
            <ValidatorInput />
            <div className="flex gap-4 text-muted-foreground">
              <span>E.g.:</span>
              <Link
                href="/card-validator?url=vercel.com"
                className="hover:underline"
              >
                vercel.com
              </Link>
              <Link
                href="/card-validator?url=teenage.engineering"
                className="hover:underline"
              >
                teenage.engineering
              </Link>
              <Link
                href="/card-validator?url=dub.co"
                className="hover:underline"
              >
                dub.co
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
