'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@utils/tailwind'
import { buttonVariants } from '@components/ui/button'
import { ModeToggle } from '@components/theme-provider'
import { TooltipWrapper } from '@components/ui/tooltip'
import { GitHubLogoIcon, FileTextIcon, CodeIcon } from '@radix-ui/react-icons'




const Navbar = () => {
  return (
    <nav className='flex w-full h-auto justify-center dark:bg-black/60 bg-white/60 shadow-sm backdrop-blur-sm'>
      <div className='flex flex-row self-center justify-between w-[95%] h-full mt-4 mb-2 gap-1'>
        {/* Left */}
        <div className='flex flex-row gap-1 self-center'>
          <TooltipWrapper text='Home page' asChild>
            <Link href='/' className={cn(buttonVariants({ variant: 'link' }), 'my-auto font-bold text-lg')}>
              <CodeIcon className='h-6 w-6 rotate-0 scale-100 mr-2' />
              Portfolio
            </Link>
          </TooltipWrapper>


          <TooltipWrapper text='View my projects!' asChild>
            <Link href='/projects' className={cn(buttonVariants({ variant: 'link' }), 'my-auto text-sm font-normal')}>
              Projects
            </Link>
          </TooltipWrapper>
        </div>


        {/* Right */}
        <div className='flex flex-row self-center gap-1'>
          <TooltipWrapper text='View my blog!' asChild>
            <Link href='/blog' className={cn(buttonVariants({ variant: 'outline' }), 'my-auto')}>
              <FileTextIcon className='h-4 w-4 rotate-0 scale-100 mr-2' />
              Blog
            </Link>
          </TooltipWrapper>


          <TooltipWrapper text='Github' asChild>
            <Link
              href='https://github.com/caffeine-addictt'
              target='_blank'
              referrerPolicy='no-referrer-when-downgrade'
              className={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'my-auto')}
            >
              <GitHubLogoIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100' />
            </Link>
          </TooltipWrapper>

          <ModeToggle className='my-auto' />
        </div>
      </div>
    </nav>
  )
}
export default Navbar
