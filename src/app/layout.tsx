import '@styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '@utils/tailwind'
import { ThemeProvider } from '@components/theme-provider'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Navbar from '@components/navbar'
import Footer from '@components/footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Alex\'s Portfolio',
    template: '%s | Alex\'s Portfolio',
  },
  description: 'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
  keywords: ['portfolio', 'blog', 'nextjs', 'tailwindcss', 'vercel', 'react', 'typescript', 'programmer', 'coding', 'developer', 'full-stack', 'software', 'singapore', 'sg'],
  applicationName: 'Alex\'s Portfolio',
  authors: [{ name: 'Alex', url: 'https://ngjx.org' }],
  creator: 'Alex Ng Jun Xiang',
  publisher: 'Alex Ng Jun Xiang',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Alex\'s Portfolio and Blog Site',
    description: 'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
    url: 'https://ngjx.org',
    siteName: 'ngjx.org',
    images: [
      {
        url: 'https://ngjx.org/images/siteScreenshot.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Alex\'s Portfolio and Blog Site',
    description: 'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
    card: 'summary_large_image',
    images: ['https://ngjx.org/images/siteScreenshot.png'],
  },
  appleWebApp: {
    title: 'Alex\'s Portfolio and Blog Site',
    capable: true,
    statusBarStyle: 'default',
  },
  metadataBase: new URL('https://ngjx.org'),
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/images/dark.svg',
        href: '/images/dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/images/light.svg',
        href: '/images/light.svg',
      },
    ],
  },
}


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(
        inter.className,
        'scroll-smooth',
        'flex min-h-screen min-w-full max-w-full flex-col',
        'text-text-light dark:text-text-dark',
        'bg-background-light dark:bg-background-dark'
      )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <Navbar />
          <main className='flex w-full max-w-full grow'>
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export default RootLayout
