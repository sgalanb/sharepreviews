'use client'

import { useEffect } from 'react'

export default function TestimonialsBadge() {
  useEffect(() => {
    const scriptIds = [
      '1a012f35-b416-4a43-b367-c650737b3195',
      'b750cc73-45fa-4776-9e43-b8af631d55b6',
    ]

    scriptIds.forEach((id) => {
      const script = document.createElement('script')
      script.src = `https://widget.senja.io/widget/${id}/platform.js`
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    })
  }, [])

  return (
    <>
      <div
        className="senja-embed dark:hidden"
        data-id="1a012f35-b416-4a43-b367-c650737b3195"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <div
        className="senja-embed hidden dark:block"
        data-id="b750cc73-45fa-4776-9e43-b8af631d55b6"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
    </>
  )
}
