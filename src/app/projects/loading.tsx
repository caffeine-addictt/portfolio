'use client'

import * as React from 'react'
import { useSearchParams } from 'next/navigation'

import { SearchUISkeleton } from './search'
import { ProjectCardsSkeleton } from './projectcard'

const FullPageSkeleton = () => {
  const params = useSearchParams()
  return (
    <div className='mb-4 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
      <SearchUISkeleton query={params?.get('query') || ''}/>

      <div className='flex w-[80%] flex-wrap justify-center gap-2 max-sm:w-[97.5%]'>
        <ProjectCardsSkeleton cardCount={4} />
      </div>
    </div>
  )
}
export default FullPageSkeleton
