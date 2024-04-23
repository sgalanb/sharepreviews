'use client'

import Script from 'next/script'

export default function TestimonialsWOL() {
  return (
    <>
      <div
        className="senja-embed mt-4 w-full dark:hidden"
        data-id="4f4d6a80-8cf4-47fd-92cd-49fde82a0798"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <Script
        async
        type="text/javascript"
        src="https://widget.senja.io/widget/4f4d6a80-8cf4-47fd-92cd-49fde82a0798/platform.js"
      ></Script>
      <div
        className="senja-embed mt-4 hidden w-full dark:block"
        data-id="aaba8f67-2508-49f7-a4c3-9adbf9b2047d"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <Script
        async
        type="text/javascript"
        src="https://widget.senja.io/widget/aaba8f67-2508-49f7-a4c3-9adbf9b2047d/platform.js"
      ></Script>
    </>
  )
}
