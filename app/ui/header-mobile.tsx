'use client'

import { ThemeToggle } from '@/app/ui/theme-toggle'
import Image from 'next/image'
import Link from 'next/link'

export default function HeaderMobile() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background transition-colors duration-200 lg:hidden">
      <nav className="w-fulls flex items-center justify-between p-2">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src="/icon.svg" alt="SharePreviews" width={40} height={40} />
        </Link>
        <div className="flex gap-2">
          <ThemeToggle ghost />
        </div>
      </nav>
    </header>
  )
}
