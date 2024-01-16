'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

import { cn } from '@utils/tailwind'
import { TooltipWrapper } from './tooltip'
import { Button, ButtonProps } from './button'
import { ArrowUpIcon } from '@radix-ui/react-icons'


const SmoothScroll = React.forwardRef<HTMLButtonElement, ButtonProps & { toId: string }>(
  ({ toId, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        onClick={() => {
          if (window) {
            window.scrollTo({
              top: document.getElementById(toId)?.offsetTop || 0,
              behavior: 'smooth',
            })
          }
        }}
      />
    )
  }
)
SmoothScroll.displayName = 'SmoothScroll'




const BackToTopButton = React.forwardRef<HTMLButtonElement, Omit<Omit<ButtonProps, 'size'>, 'variant'>>(
  ({ className, ...props }, ref) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
      if (window) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 500) {
            setShow(true)
          } else {
            setShow(false)
          }
        })
      }
    }, [show])

    return (
      <TooltipWrapper text='Back to top' asChild>
        <Button
          ref={ref}
          {...props}
          size='icon'
          variant='ghost'
          onClick={() => {
            if (window) {
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          }}
          className={cn(
            'fixed bottom-8 right-8 z-50 transition-all',
            {
              'opacity-0': !show,
              'opacity-100': show
            }
          )}
        ><ArrowUpIcon className='h-6 w-6' /></Button>
      </TooltipWrapper>
    )
  }
)
BackToTopButton.displayName = 'BackToTopButton'




export { SmoothScroll, BackToTopButton }
