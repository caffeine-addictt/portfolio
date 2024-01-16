'use client'

import * as React from 'react'
import { Button, InternalLink } from '@components/ui/button'
import { TooltipWrapper } from '@components/ui/tooltip'

import { ArrowTopRightIcon } from '@radix-ui/react-icons'


const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) => {
  return (
    <>
      <div className='mt-16 pb-16 flex min-h-screen min-w-full max-w-full flex-col justify-center items-center'>
        <h1 className='text-5xl font-bold mb-8'>Looks like something went wrong!</h1>

        <div className='flex flex-row max-sm:flex-wrap gap-2'>
          <TooltipWrapper text='Go back home!' asChild>
            <InternalLink href='/'>Go back home</InternalLink>
          </TooltipWrapper>
          <TooltipWrapper text='Try again!' asChild>
            <Button onClick={() => reset()}>Try again?</Button>
          </TooltipWrapper>
        </div>
      </div>

      {/* Report */}
      <div className='mb-8 right-0 bottom-0 absolute flex h-fit w-fit flex-col items-center gap-4 sm:mr-[2.5%]'>
      <TooltipWrapper text='Report an issue!' asChild>
        <InternalLink variant='outline' href='/contact'>
          Report an issue
          <ArrowTopRightIcon className='ml-2'/>
        </InternalLink>
      </TooltipWrapper>
    </div>
  </>
  )
}
export default ErrorPage
