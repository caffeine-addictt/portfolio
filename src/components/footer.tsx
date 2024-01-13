'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@utils/tailwind'

import { Separator } from '@components/ui/separator'
import { buttonVariants } from '@components/ui/button'
import { TooltipWrapper } from '@components/ui/tooltip'

import {
  VercelIcon,
  NextJSIcon,
  RadixUIIcon,
  ShadcnUIIcon,
  TailwindCSSIcon
} from '@components/icons/devicons'
import { CodeIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'


const Footer = () => {
  return (
    <footer className='flex flex-col h-auto w-full pb-4 px-[5%] bg-white/60 backdrop-blur-sm dark:bg-black/60'>
      <Separator className='absolute w-[95%] left-[2.5%]' />

      {/* Top */}
      <div className='flex flex-col max-sm:gap-8 sm:flex-row sm:justify-between h-full w-full mb-4 pt-6'>
        {/* Left */}
        <div className='flex flex-col max-sm:self-center max-sm:items-center'>
          <TooltipWrapper text='Home page' asChild>
            <Link href='/' className={cn(buttonVariants({ variant: 'link' }), 'text-lg font-bold p-0 justify-start')}>
              <CodeIcon className='mr-2 h-6 w-6 rotate-0 scale-100' />
              Technology
            </Link>
          </TooltipWrapper>

          <Separator className='mb-4' />

          {/* Technology stack */}
          <div className='flex flex-wrap gap-4'>
            <TechnologyStackItem href='https://nextjs.org/'      text='NextJS'>     <NextJSIcon />     </TechnologyStackItem>
            <TechnologyStackItem href='https://tailwindcss.com/' text='TailwindCSS'><TailwindCSSIcon /></TechnologyStackItem>
            <TechnologyStackItem href='https://vercel.com/'      text='Vercel'>     <VercelIcon />     </TechnologyStackItem>
            <TechnologyStackItem href='https://ui.shadcn.com/'   text='Shadcn'>     <ShadcnUIIcon />   </TechnologyStackItem>
            <TechnologyStackItem href='https://radix-ui.com/'    text='Radix'>      <RadixUIIcon />    </TechnologyStackItem>
          </div>
        </div>


        {/* Right */}
        <div className='flex flex-row sm:flex-col max-sm:justify-center sm:max-w-[50%] gap-4 max-sm:self-center max-sm:items-center'>

          {/* Left */}
          <div className='flex flex-col gap-4 max-sm:self-start'>
            <h2 className='text-lg font-bold'>Social</h2>

            <div className='flex flex-wrap gap-1'>
              <TechnologyStackItem
                href='https://github.com/caffeine-addictt'
                text='GitHub'
              ><GitHubLogoIcon className='w-6 h-6' /></TechnologyStackItem>

              <TechnologyStackItem
                href='https://linkedin.com/in/ngjx'
                text='LinkedIn'
              ><LinkedInLogoIcon className='w-6 h-6' /></TechnologyStackItem>

            </div>
          </div>

          <Separator orientation='vertical' className='my-2 sm:hidden h-14' />

          {/* Right */}
          <div className='break-before-auto max-sm:max-w-[60%]'>
            <p>Have an inqury or project idea?</p>
            Feel free to contact me anytime at&nbsp;
            <TooltipWrapper text='contact@ngjx.org' asChild>
              <Link href='mailto:contact@ngjx.org' className='hover:underline text-blue-500'>
                contact@ngjx.org
              </Link>
            </TooltipWrapper>.
          </div>

        </div>

      </div>




      <Separator className='my-4'/>




      {/* Bottom */}
      <div className='flex flex-col sm:flex-row-reverse items-center sm:justify-between w-full h-full'>
        <div className='text-sm font-light opacity-80'>
          <TechnologyStackItem text='Vercel' href='https://vercel.com/' className='hover:underline'>Powered by Vercel</TechnologyStackItem>
        </div>

        <p className='text-sm font-light opacity-80'>© Copyright {new Date().getFullYear()} Jun Xiang. All rights reserved.</p>
      </div>
    </footer>
  )
}
export default Footer




const TechnologyStackItem = React.forwardRef<
  React.ElementRef<typeof TooltipWrapper>,
  React.ComponentPropsWithoutRef<typeof TooltipWrapper> & { href: string, className?: string }
>(({ children, href, className, ...props }, ref) => (
  <TooltipWrapper ref={ref} {...props} asChild>
    <Link {...props} href={href} className={className} target='_blank' referrerPolicy='no-referrer-when-downgrade'>
      {children}
    </Link>
  </TooltipWrapper>
))
