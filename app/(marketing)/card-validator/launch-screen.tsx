'use client'

import ValidatorInput from '@/app/ui/validator-input'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

export default function ValidatorLaunchScreen({
  isApp,
  projectPathname,
}: {
  isApp: boolean
  projectPathname: string
}) {
  return (
    <AnimatePresence>
      <motion.div
        className={`${
          isApp ? 'h-full lg:p-12' : 'pt-8'
        } flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:gap-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex w-full flex-col items-center justify-start gap-4">
          <h1 className="marketing-title text-balance text-center">
            Preview Card Validator
          </h1>
          <p className="marketing-subtitle text-balance text-center text-muted-foreground lg:px-28">
            Check how your links look when shared. Validate that you have the
            right metatags configured so your images are displayed correctly.
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-4 pt-2">
          <ValidatorInput isApp={isApp} projectPathname={projectPathname} />
          <div className="flex gap-4 text-muted-foreground">
            <span>E.g.:</span>
            <Link
              href={
                isApp
                  ? `/${projectPathname}/validator?url=vercel.com`
                  : '/card-validator?url=vercel.com'
              }
              className="hover:underline"
            >
              vercel.com
            </Link>
            <Link
              href={
                isApp
                  ? `/${projectPathname}/validator?url=teenage.engineering`
                  : '/card-validator?url=teenage.engineering'
              }
              className="hover:underline"
            >
              teenage.engineering
            </Link>
            <Link
              href={
                isApp
                  ? `/${projectPathname}/validator?url=dub.co`
                  : '/card-validator?url=dub.co'
              }
              className="hover:underline"
            >
              dub.co
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
