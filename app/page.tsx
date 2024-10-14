'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamicznie importujemy komponent WebpToJpgConverter
const WebpToJpgConverter = dynamic(() => import('../components/WebpToJpgConverter'), {
  ssr: false, // Wyłączamy Server-Side Rendering dla tego komponentu
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WebpToJpgConverter />
    </main>
  )
}