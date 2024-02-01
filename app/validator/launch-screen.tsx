'use client'
import { TypographyH1, TypographyP } from '@/app/ui/components/typography'
import ValidatorInput from '@/app/ui/validator-input'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

export default function ValidatorLaunchScreen() {
  return (
    <AnimatePresence>
      <motion.div
        className="flex w-full max-w-7xl flex-col items-center justify-center gap-4 p-4 lg:p-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <TypographyH1 className="text-balance">Preview Validator</TypographyH1>
        <TypographyP className="mb-2 text-balance text-center">
          Check how your links look when shared. Validate you have the correct
          meta tags in place.
        </TypographyP>
        <ValidatorInput />
        <div className="mt-2 flex gap-4 text-muted-foreground">
          <span>E.g.:</span>
          <Link href="/validator?url=vercel.com" className="hover:underline">
            vercel.com
          </Link>
          <Link href="/validator?url=figma.com" className="hover:underline">
            figma.com
          </Link>
          <Link
            href="/validator?url=teenage.engineering"
            className="hover:underline"
          >
            teenage.engineering
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
