'use client'

import * as React from 'react'

import { Separator } from '@components/ui/separator'
import { InternalLink } from '@components/ui/button'
import { TooltipWrapper } from '@components/ui/tooltip'

import { ArrowTopRightIcon } from '@radix-ui/react-icons'


const HomePage = () => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center' style={{ minHeight: 'calc(100vh - 64px)' }}>

      <div className='flex flex-col max-sm:items-center max-sm:text-center'>
        {/* Introduction and what I do */}
        <h1 className='mb-4 text-5xl font-bold'>Hi, I&apos;m Alex</h1>
        <p className='break-normal text-lg max-sm:max-w-xs'>
          I&apos;m a <span className='text-black dark:text-white underline'>full-stack developer</span> and hobbist hacker based in Singapore.
        </p>

        {/* Links */}
        <div className='flex flex-wrap gap-4 mt-6 w-fit'>
          <Separator className='mb-0'/>

          <TooltipWrapper text='More about me!' asChild>
            <InternalLink href='/about' variant='outline'>
              About Me
            </InternalLink>
          </TooltipWrapper>

          <TooltipWrapper text='View my projects!' asChild>
            <InternalLink href='/projects' variant='outline'>
              My Projects <ArrowTopRightIcon className='ml-2' />
            </InternalLink>
          </TooltipWrapper>
        </div>
      </div>

    </div>
  )
}
export default HomePage
