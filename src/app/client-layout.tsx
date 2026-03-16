'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
  }, [])

  return (
    <>
      {isDesktop && (
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={1.7}
          outerAlpha={0}
          innerStyle={{ backgroundColor: '#fff' }}
          outerStyle={{ border: '3px solid #fff' }}
        />
      )}
      {children}
    </>
  )
}
