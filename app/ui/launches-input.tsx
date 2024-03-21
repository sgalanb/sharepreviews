'use client'

import { addContactToGeneralAudience } from '@/app/actions/actions'
import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/app/ui/components/Tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import { MailPlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function LaunchesInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem('launches-form-submitted') === 'true') {
      setSubmitted(true)
    }
  }, [])

  return (
    <AnimatePresence>
      {!submitted && (
        <motion.form
          className="flex w-full flex-col gap-2 text-balance rounded-md bg-background p-4"
          action={(formData: FormData) => {
            if (formData.get('email')) {
              setSubmitted(true)
              localStorage.setItem('launches-form-submitted', 'true')
              addContactToGeneralAudience(formData)
            } else {
              inputRef?.current?.focus()
            }
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-balance font-medium leading-5">
            Get notified on new product launches
          </span>
          <span className="text-balance text-sm leading-4 text-muted-foreground">
            No newsletter, no marketing, just a quick heads up.
          </span>
          <Input
            ref={inputRef}
            className="w-full"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <Button className="mt-1 w-full" type="submit">
            Notify Me
          </Button>
        </motion.form>
      )}

      {submitted && (
        <motion.div
          className="flex w-full items-center justify-between gap-2 text-balance rounded-md bg-background p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="w-full text-balance text-left font-medium leading-5">
            🌟 Email registered.
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    localStorage.removeItem('launches-form-submitted')
                    setSubmitted(false)
                  }}
                  className="h-fit rounded-md p-3 hover:bg-accent hover:text-accent-foreground"
                >
                  <MailPlus className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-medium">Use another email</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
