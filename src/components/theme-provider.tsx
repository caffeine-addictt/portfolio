'use client'

import * as React from 'react'
import { useTheme, ThemeProvider as NextThemeProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@components/ui/dropdown-menu'
import { Button } from '@components/ui/button'

import { titleCase } from '@utils/strings'




/** Wraps children in root layout to enable themes */
export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>
}




/** Button to enable switching themes */
export const ModeToggle = () => {
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>


      {/* Options */}
      <DropdownMenuContent align='end'>
        <DropdownItem name='light' theme={theme} setTheme={setTheme} />
        <DropdownItem name='dark' theme={theme} setTheme={setTheme} />
        <DropdownItem name='system' theme={theme} setTheme={setTheme} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


interface DropdownItemProps {
  name: string
  theme?: string
  setTheme: (theme: string) => void
}
/**
 * Dropdown menu item
 * @param {DropdownItemProps} props
 * @param props.name - Name of the theme
 * @param props.theme - Current theme
 * @param props.setTheme - Function to set the theme
 */
const DropdownItem = ({ name, theme, setTheme }: DropdownItemProps) => {
  return (
    <DropdownMenuItem
      onClick={() => setTheme(name)}
      disabled={theme === name}
    >
      {titleCase(name)}
    </DropdownMenuItem>
  )
}
