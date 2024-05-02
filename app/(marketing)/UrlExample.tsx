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
    <pre className="mt-6 flex w-full items-center justify-between gap-2 overflow-hidden break-all rounded-lg border py-4 pl-6 pr-4 text-card-foreground shadow-sm lg:w-fit">
      <code className="w-full overflow-hidden text-ellipsis break-all font-mono lg:w-fit">
        sharepreviews.com/og/
        {
          <span className="text-blue-600">
            08f36805-dea2-4575-b047-a96c9466d1f4
          </span>
        }
        ?title_value={<span className="text-green-600">{`{VALUE}`}</span>}
        &description_value={<span className="text-green-600">{`{VALUE}`}</span>}
      </code>
      <motion.div
        initial="initial"
        animate={isCopied ? 'animate' : 'exit'}
        variants={buttonVariants}
        className="w-fit"
      >
        <Button
          variant="outline"
          className="aspect-square w-10 cursor-pointer p-0"
          aria-label="Copy to clipboard"
          onClick={() =>
            copyToClipboard(
              'https://sharepreviews.com/og/08f36805-dea2-4575-b047-a96c9466d1f4?title_value={VALUE}&description_value={VALUE}'
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
