import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Home',
  description: 'AWS Cloud Clubs - SRMIST. Think Big, Build Bigger. A student-led community for cloud builders at SRM.',
}

export default function Home() {
  return <HomeClient />
}
