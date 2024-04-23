'use client'

import IframeResizer from 'iframe-resizer-react'

export default function TestimonialsWOL() {
  return (
    <IframeResizer
      src="https://embed-v2.testimonial.to/w/sharepreviews?card=base&loadMore=on&initialCount=20&tag=all"
      style={{ width: '1px', minWidth: '100%', backgroundColor: 'transparent' }}
    />
  )
}
