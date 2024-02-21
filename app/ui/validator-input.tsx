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
import { useEffect, useRef, useState } from 'react'

export default function ValidatorInput({ isLoading }: { isLoading?: boolean }) {
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
      router.push(`${eventUrl ? `/validator?url=${normalizedUrl}` : ''}`)
    } else {
      setInputError(true)
    }
  }

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef?.current?.select()
  }, [])

  return (
    <form
      onSubmit={onSubmitSite}
      className="flex w-full flex-col gap-1 lg:max-w-xl"
    >
      <div className="flex w-full gap-2">
        <Input
          ref={inputRef}
          name="url"
          id="url"
          type="text"
          autoFocus
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
        <Button type="submit" className="min-w-24">
          {isLoading ? (
            <Spinner className="h-7 w-7 fill-primary-foreground text-primary-foreground/25" />
          ) : (
            'Validate'
          )}
        </Button>
      </div>
      {inputError && (
        <div className="text-sm text-red-500">Please enter a valid URL.</div>
      )}
    </form>
  )
}
