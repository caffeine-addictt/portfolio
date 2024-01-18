'use client'

import * as React from 'react'
import { cn } from '@utils/tailwind'
import { PortableText } from '@portabletext/react'


/**
 * Resolves issues with @tailwind/typography
 * dark:!prose-invert does not support "dark:"
 */
const EnforceTypographyStyling = React.forwardRef<
  React.ComponentRef<'article'>,
  React.ComponentPropsWithoutRef<typeof PortableText> & { className?: string }
>(({ className, ...props }, ref) => {
  const preRender = <PortableText {...props} />

  return (
    <>
      <article
        ref={ref}
        className={cn(
          'prose lg:prose-xl prose-neutral block dark:hidden',
          className
        )}
      >
        {preRender}
      </article>
      <article
        ref={ref}
        className={cn(
          'prose lg:prose-xl prose-neutral !prose-invert hidden dark:block',
          className
        )}
      >
        {preRender}
      </article>
    </>
  )
})
EnforceTypographyStyling.displayName = 'EnforceTypographyStyling'

export { EnforceTypographyStyling }
