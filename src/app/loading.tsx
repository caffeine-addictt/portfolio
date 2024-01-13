'use client'

import * as React from 'react'
import { SymbolIcon } from '@radix-ui/react-icons'

const LoadingPage = () => (
  <div className='flex min-h-screen min-w-full max-w-full flex-col items-center justify-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
    <SymbolIcon className='w-10 h-10 transition-transform animate-spin before:rotate-0 after:rotate-180'/>
  </div>
)
export default LoadingPage
