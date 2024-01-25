'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

import { cn } from '@utils/tailwind'
import { useToast } from './use-toast'

import { TooltipWrapper } from './tooltip'
import { Button, ButtonProps } from './button'
import { ArrowUpIcon, CopyIcon } from '@radix-ui/react-icons'


const CopyButton = React.forwardRef<
  React.ElementRef<typeof TooltipWrapper>,
  Omit<React.ComponentPropsWithoutRef<typeof TooltipWrapper>, 'children' | 'text'> & { className?: string, content: string, text?: string }
>(({ className, content, text = 'Copy to clipboard', ...props }, ref) => {
  const { toast } = useToast()
  return (
    <TooltipWrapper text={text} ref={ref} {...props} asChild>
      <Button
        size='icon'
        variant='secondary'
        className={cn('p-2', className)}
        onClick={() => {
          navigator.clipboard.writeText(content)
          toast({ title: 'Copied to clipboard' })
        }}
      >
        <CopyIcon className={cn('h-6 w-6', className)} />
        <span className='sr-only'>Copy to clipboard</span>
      </Button>
    </TooltipWrapper>
  )
})
CopyButton.displayName = 'CopyButton'




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




export { CopyButton, SmoothScroll, BackToTopButton }
