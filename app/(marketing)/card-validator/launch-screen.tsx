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
          isApp ? 'h-full lg:p-12' : 'lg:pt-8'
        } flex h-full w-full max-w-7xl flex-col items-center justify-center gap-4 p-4`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="marketing-title text-balance text-center">
          Preview Card Validator
        </h1>
        <p className="mb-2 text-balance text-center">
          Check how your links look when shared. Validate you have the correct
          metatags in place.
        </p>
        <ValidatorInput isApp={isApp} />
        <div className="mt-2 flex gap-4 text-muted-foreground">
          <span>E.g.:</span>
          <Link
            href={
              isApp
                ? `/${projectPathname}/validator?url=arc.net`
                : '/card-validator?url=arc.net'
            }
            className="hover:underline"
          >
            arc.net
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
      </motion.div>
    </AnimatePresence>
  )
}
