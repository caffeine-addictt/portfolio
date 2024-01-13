'use client'

import * as React from 'react'

import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { InternalLink, ExternalLink } from '@components/ui/button'
import { Separator } from '@components/ui/separator'

const NotFoundError = () => (
  <div className='flex min-h-screen min-w-full max-w-full flex-col' style={{ minHeight: 'calc(100vh - 64px)' }}>

    {/* Error Message */}
    <div className='flex grow flex-col items-center justify-center'>
      {/* Error Code */}
      <div className='mb-10 flex flex-row items-center'>
        <h1 className='text-5xl font-bold'>404</h1>
        <Separator className='mx-4' orientation='vertical' />
        <p className='text-2xl'>Page not found</p>
      </div>

      {/* Text */}
      <p className='text-lg'>
        Sorry, we couldn&apos;t find this page.
      </p>

      {/* Link */}
      <InternalLink href='/' variant='outline' className='my-4'>
        Go back home
      </InternalLink>
    </div>


    {/* Report */}
    <div className='mb-8 flex h-fit w-fit flex-col items-center gap-4 self-center sm:mr-[2.5%] sm:self-end'>
      <ExternalLink variant='outline' href='https://github.com/caffeine-addictt/portfolio/issues/new'>
        Report an issue
        <ExternalLinkIcon className='ml-2'/>
      </ExternalLink>
    </div>
  </div>
)
export default NotFoundError
