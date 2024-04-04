'use client'

import { Button } from '@/app/ui/components/Button'
import { Input } from '@/app/ui/components/Input'
import { Label } from '@/app/ui/components/Label'
import Spinner from '@/app/ui/components/Spinner'
import {
  getUrlFromString,
  getUrlFromStringWithoutWWW,
  getUrlFromStringWithoutWWWOrProtocol,
} from '@/app/utils'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'

export default function ValidatorInput({
  isApp,
  isHome,
  isLoading,
  projectPathname,
}: {
  isApp: boolean
  isHome?: boolean
  isLoading?: boolean
  projectPathname?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const inputUrl = searchParams?.get('url') || ''
  const normalizedUrl = getUrlFromStringWithoutWWW(inputUrl)
  const urlWithoutWWWOrProtocol = getUrlFromStringWithoutWWWOrProtocol(
    normalizedUrl || ''
  )

  const [inputError, setInputError] = useState<boolean>(false)

  const onSubmitSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const eventUrl = e.currentTarget.url.value
    const normalizedUrl = getUrlFromStringWithoutWWW(
      getUrlFromString(eventUrl || '') || ''
    )

    if (!!normalizedUrl) {
      router.push(
        `${
          eventUrl
            ? isApp
              ? `/${projectPathname}/validator?url=${normalizedUrl}`
              : `/card-validator?url=${normalizedUrl}`
            : ''
        }`
      )
    } else {
      setInputError(true)
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={onSubmitSite}
      className="flex w-full flex-col gap-2 lg:max-w-xl lg:flex-row"
    >
      <div className="flex w-full flex-col gap-1">
        <Input
          ref={inputRef}
          name="url"
          id="url"
          type="text"
          autoFocus={!isHome}
          defaultValue={urlWithoutWWWOrProtocol || ''}
          placeholder="Enter a URL"
          aria-invalid="true"
          onChange={() => {
            setInputError(false)
          }}
          leftLabel={
            <Label htmlFor="url" className="text-muted-foreground">
              https://
            </Label>
          }
          className="bg-card pl-[4.75rem]"
        />
        {inputError && (
          <div className="text-sm text-red-500">Please enter a valid URL.</div>
        )}
      </div>
      <Button type="submit" className="min-w-24">
        {isLoading ? (
          <Spinner className="h-6 w-6 fill-primary-foreground text-primary-foreground/25" />
        ) : (
          'Validate'
        )}
      </Button>
    </form>
  )
}
