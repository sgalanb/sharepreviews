'use client'
import { TemplateType } from '@/app/db/schema'
import { Button } from '@/app/ui/components/Button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/ui/components/Dialog'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import { getUrlWithVariables } from '@/app/utils'
import { motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function GetTestUrlButton({
  template,
}: {
  template: TemplateType
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
  const buttonVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.2, transition: { duration: 0.2 } },
    exit: { scale: 1, transition: { duration: 0.2 } },
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="select-none">
          Try it out
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Template URL</DialogTitle>
          <DialogDescription>
            {`Use this URL to generate different images based on this
                  template.`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={getUrlWithVariables(template)}
              readOnly
            />
          </div>
          <motion.div
            initial="initial"
            animate={isCopied ? 'animate' : 'exit'}
            variants={buttonVariants}
          >
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={() => copyToClipboard(getUrlWithVariables(template))}
            >
              <span className="sr-only">Copy</span>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </motion.div>
        </div>
        <DialogDescription>
          To see the generated image, open the URL in your browser. <br />{' '}
          Replace {`{VALUE}`} with the value you want to use.
        </DialogDescription>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
