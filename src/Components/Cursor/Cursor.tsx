'use client'

import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 180px at ${e.clientX}px ${e.clientY}px, rgba(184, 54, 254, 0.12), transparent 70%)`
      }
    }

    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={spotlightRef} className="cursor-spotlight" />
}
