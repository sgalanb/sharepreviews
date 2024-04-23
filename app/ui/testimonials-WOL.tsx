'use client'

import { useEffect } from 'react'

export default function TestimonialsWOL() {
  useEffect(() => {
    // Define the widget IDs in an array for easy management
    const widgetIds = [
      '4f4d6a80-8cf4-47fd-92cd-49fde82a0798',
      'aaba8f67-2508-49f7-a4c3-9adbf9b2047d',
    ]

    // Function to dynamically load each script based on its ID
    widgetIds.forEach((id) => {
      const script = document.createElement('script')
      script.src = `https://widget.senja.io/widget/${id}/platform.js`
      script.async = true
      document.body.appendChild(script)

      // Cleanup function to remove the script from the body when component unmounts
      return () => {
        document.body.removeChild(script)
      }
    })
  }, []) // The empty dependency array ensures this effect only runs once on component mount

  return (
    <>
      <div
        className="senja-embed mt-4 w-full dark:hidden"
        data-id="4f4d6a80-8cf4-47fd-92cd-49fde82a0798"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
      <div
        className="senja-embed mt-4 hidden w-full dark:block"
        data-id="aaba8f67-2508-49f7-a4c3-9adbf9b2047d"
        data-mode="shadow"
        data-lazyload="false"
      ></div>
    </>
  )
}
