'use client'

import * as React from 'react'
import { SymbolIcon } from '@radix-ui/react-icons'

const LoadingPage = () => (
  <div className='flex min-h-screen min-w-full max-w-full flex-col items-center justify-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
    <SymbolIcon className='h-10 w-10 animate-spin transition-transform before:rotate-0 after:rotate-180'/>
  </div>
)
export default LoadingPage
