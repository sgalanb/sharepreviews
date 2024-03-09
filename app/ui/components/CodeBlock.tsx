'use client'

import { Button } from '@/app/ui/components/Button'
import { cn } from '@/app/utils'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function CodeBlock({
  children,
  className,
  ...props
}: {
  children: string
  className?: string
}) {
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
    <pre
      className={cn(
        'flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border bg-card px-4 py-2 text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      <code className="w-full overflow-hidden text-ellipsis break-all font-mono">
        {children}
      </code>
      <motion.div
        initial="initial"
        animate={isCopied ? 'animate' : 'exit'}
        variants={buttonVariants}
      >
        <Button
          variant="ghost"
          className="aspect-square w-10 p-0"
          onClick={() => copyToClipboard(children)}
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
