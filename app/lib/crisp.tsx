'use client'

import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure('9f015aa2-4e0b-49e5-ae3c-29849fbae596')
  })

  return null
}
