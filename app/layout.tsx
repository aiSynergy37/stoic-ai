import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Space_Grotesk } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { SupportWidget } from '@/components/support-widget'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STOICAI | Engineering Intelligent Systems for the Future',
  description: 'We build cutting-edge AI, ML, and Agentic systems for global businesses. From LLM applications to autonomous agents, we deliver production-grade AI solutions.',
  generator: 'STOICAI',
  keywords: ['AI', 'Machine Learning', 'Agentic AI', 'LLM', 'RAG', 'Generative AI', 'AI Automation', 'Enterprise AI'],
  authors: [{ name: 'STOICAI' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a1a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${dmSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <div className="relative min-h-screen bg-background overflow-x-hidden">
          <Navbar />
          {children}
          <Footer />
          <SupportWidget />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
