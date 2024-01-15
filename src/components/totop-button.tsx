'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

import { cn } from '@utils/tailwind'
import { Button } from '@components/ui/button'
import { ArrowUpIcon } from '@radix-ui/react-icons'


const BackToTopButton = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          setShow(true)
        } else {
          setShow(false)
        }
      })
    }
  }, [show])

  return (
  <Button
    size='icon'
    variant='ghost'
    className={cn(
      'fixed bottom-8 right-8 z-50 transition-all',
      {
        'opacity-0': !show,
        'opacity-100': show
      }
    )}
    onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }}
  >
    <ArrowUpIcon />
  </Button>
)}
export default BackToTopButton
