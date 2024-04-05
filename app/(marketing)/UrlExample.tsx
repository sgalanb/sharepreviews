'use client'

import { Button } from '@/app/ui/components/Button'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function UrlExample() {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 700) // Reset after 0.7 seconds
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Animation variants for the button
  const buttonVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.2, transition: { duration: 0.2 } },
    exit: { scale: 1, transition: { duration: 0.2 } },
  }
  return (
    <pre className="mt-6 flex w-full items-center justify-between gap-8 overflow-hidden break-all rounded-lg border py-4 pl-6 pr-4 text-card-foreground shadow-sm lg:w-fit">
      <code className="w-full overflow-hidden text-ellipsis break-all font-mono lg:w-fit">
        https://sharepreviews.com/og/
        {
          <span className="text-blue-600">
            6a9a84f6-4236-46a6-8dce-519826d2b131
          </span>
        }
        ?text_value={<span className="text-green-600">{`{VALUE}`}</span>}
        &text_value={<span className="text-green-600">{`{VALUE}`}</span>}
      </code>
      <motion.div
        initial="initial"
        animate={isCopied ? 'animate' : 'exit'}
        variants={buttonVariants}
        className="w-fit"
      >
        <Button
          variant="outline"
          className="aspect-square w-10 p-0"
          onClick={() =>
            copyToClipboard(
              'https://sharepreviews.com/og/6a9a84f6-4236-46a6-8dce-519826d2b131?text_value={VALUE}&text_value={VALUE}'
            )
          }
        >
          {isCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
    </pre>
  )
}
