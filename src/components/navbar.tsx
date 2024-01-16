'use client'

import * as React from 'react'
import { InternalLink, ExternalLink } from '@components/ui/button'

import { ModeToggle } from '@components/theme-provider'
import { TooltipWrapper } from '@components/ui/tooltip'
import { GitHubLogoIcon, FileTextIcon, CodeIcon } from '@radix-ui/react-icons'




const Navbar = () => {
  return (
    <nav className='fixed flex h-16 w-full justify-center bg-white/60 shadow-sm backdrop-blur-sm dark:bg-black/60'>
      <div className='mb-2 mt-4 flex h-full w-[95%] flex-row justify-between gap-1 self-center'>
        {/* Left */}
        <div className='flex flex-row gap-1 self-center'>
          <TooltipWrapper text='Home page' asChild>
            <InternalLink href='/' variant='link' className='my-auto text-lg font-bold'>
              <CodeIcon className='mr-2 h-6 w-6 rotate-0 scale-100' />
              Portfolio
            </InternalLink>
          </TooltipWrapper>


          <TooltipWrapper text='View my projects!' asChild>
            <InternalLink href='/projects' variant='link' className='my-auto text-sm font-normal'>
              Projects
            </InternalLink>
          </TooltipWrapper>
        </div>


        {/* Right */}
        <div className='flex flex-row gap-1 self-center'>
          <TooltipWrapper text='View my blog!' asChild>
            <InternalLink href='/blog' variant='outline' className='my-auto'>
              <FileTextIcon className='mr-2 h-4 w-4 rotate-0 scale-100' />
              Blog
            </InternalLink>
          </TooltipWrapper>


          <TooltipWrapper text='Github' asChild>
            <ExternalLink
              href='https://github.com/caffeine-addictt'
              variant='outline'
              size='icon'
              className='my-auto'
            >
              <GitHubLogoIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100' />
            </ExternalLink>
          </TooltipWrapper>

          <ModeToggle className='my-auto' />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
