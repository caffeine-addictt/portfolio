import * as React from 'react'
import { Suspense } from 'react'
import Image from 'next/image'

import { cn } from '@utils/tailwind'
import { urlFor, getImageDimensions } from '@lib/sanity/client'
import { PortableText } from '@portabletext/react'

import { Skeleton } from '@components/ui/skeleton'
import { AspectRatio } from '@components/ui/aspect-ratio'


/**
 * Resolves issues with @tailwind/typography
 * dark:!prose-invert does not support "dark:"
 */
const EnforceTypographyStyling = React.forwardRef<
  React.ComponentRef<'article'>,
  React.ComponentPropsWithoutRef<typeof PortableText> & { className?: string }
>(({ className, ...props }, ref) => {
  const preRender = (
    <PortableText
      {...props}
      components={{
        ...props.components,
        types: {
          image: ({ value }) => {
            const { width, height } = getImageDimensions(value)
            if (!width || !height) return null

            return (
              <div className='my-8 flex h-96 max-h-96 w-auto items-center'>
                <AspectRatio ratio={width / height}>
                  <Suspense fallback={<Skeleton className='h-full w-full' />}>
                    <Image
                      src={urlFor(value).url()}
                      alt={value.alt || ''}
                      width={width}
                      height={height}
                      loading='lazy'
                      className='h-full w-full rounded-lg object-cover'
                    />
                  </Suspense>
                </AspectRatio>
              </div>
            )
          },
        }
      }}
    />
  )

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
