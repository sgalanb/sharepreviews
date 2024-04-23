'use client'

import Script from 'next/script'

export default function TestimonialsBadge() {
  return (
    <>
      <div
        className="senja-embed dark:hidden"
        data-id="1a012f35-b416-4a43-b367-c650737b3195"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <Script
        async
        type="text/javascript"
        src="https://widget.senja.io/widget/1a012f35-b416-4a43-b367-c650737b3195/platform.js"
      ></Script>
      <div
        className="senja-embed hidden dark:block"
        data-id="b750cc73-45fa-4776-9e43-b8af631d55b6"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <Script
        async
        type="text/javascript"
        src="https://widget.senja.io/widget/b750cc73-45fa-4776-9e43-b8af631d55b6/platform.js"
      ></Script>
    </>
  )
}
