import '@styles/globals.css'

import { cn } from '@utils/tailwind'
import { ThemeProvider } from '@components/theme-provider'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import Navbar from '@components/navbar'
import Footer from '@components/footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Alex\'s Portfolio',
  description: 'Alex\'s Portfolio and Blog Site',
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
      </body>
    </html>
  )
}

export default RootLayout
