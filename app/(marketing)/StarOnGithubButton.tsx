'use client'

import { Button } from '@/app/ui/components/Button'
import GitHub from '@/app/ui/svgs/social-icons/GitHub'
import { track } from '@vercel/analytics/react'
import Link from 'next/link'

export default function StarOnGithubButton({
  variant,
}: {
  variant: 'short' | 'long'
}) {
  return (
    <>
      {variant === 'short' ? (
        <Button
          variant="outline"
          size="lg"
          className="my-1 flex cursor-pointer items-center justify-center gap-2 bg-white px-3 text-base text-[#0E1117] dark:bg-[#0E1117] dark:text-white dark:hover:opacity-90"
          asChild
        >
          <Link
            href="https://github.com/sgalanb/sharepreviews"
            target="_blank"
            onClick={() => {
              track('star_on_github')
            }}
          >
            <GitHub
              className="h-4 w-4"
              fillClassName="dark:fill-white fill-[#0E1117]"
            />
            Star on GitHub
          </Link>
        </Button>
      ) : (
        <Link
          href="https://github.com/sgalanb/sharepreviews"
          target="_blank"
          className="mt-8 flex items-center justify-center gap-2 rounded-md bg-[#0E1117] px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-[#0E1117]"
          onClick={() => {
            track('star_on_github')
          }}
        >
          <GitHub
            className="h-4 w-4"
            fillClassName="fill-white dark:fill-[#0E1117]"
          />
          Star on GitHub
        </Link>
      )}
    </>
  )
}
