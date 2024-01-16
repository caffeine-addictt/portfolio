'use client'

import * as React from 'react'

import { Skeleton } from '@components/ui/skeleton'


const FullPageSkeleton = () => (
  <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
    <Skeleton className='h-10 w-10'/>
  </div>
)
export default FullPageSkeleton
