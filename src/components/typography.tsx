import * as React from 'react'
import { Suspense } from 'react'
import Image from 'next/image'

import { cn } from '@utils/tailwind'
import { urlFor, getImageDimensions } from '@lib/sanity/client'

import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Skeleton } from '@components/ui/skeleton'




/**
 * Resolves issues with @tailwind/typography
 * dark:!prose-invert does not support "dark:"
 */
const EnforceTypographyStyling = React.forwardRef<
  React.ComponentRef<'article'>,
  React.ComponentPropsWithoutRef<typeof PortableText> & { className?: string, components?: { types?: any, [x: string]: any } }
>(({ className, components, ...props }, ref) => {
  const preRender = (
    <PortableText
      {...props}
      components={{
        ...components,
        types: {
          image: imageComponent,
          code: codeComponent,
          ...components?.types,
        }
      }}
    />
  )

  return (
    <>
      <article
        ref={ref}
        className={cn(
          'prose prose-neutral block lg:prose-xl dark:hidden',
          className
        )}
      >
        {preRender}
      </article>
      <article
        ref={ref}
        className={cn(
          'prose prose-neutral !prose-invert hidden lg:prose-xl dark:block',
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




const imageComponent = ({ value }: { value: any }) => {
  const { width, height } = getImageDimensions(value)
  if (!width || !height) return null

  return (
    <div className='my-8 flex aspect-video h-96 max-h-96 w-screen max-w-full mx-auto items-center rounded-lg overflow-hidden'>
      <Suspense fallback={<Skeleton className='h-screen w-screen' />}>
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
          width={width}
          height={height}
          loading='lazy'
          className='w-full h-full'
        />
      </Suspense>
    </div>
  )
}


const codeComponent = ({ value }: { value: any }) => {
  return (
    <div>
      <SyntaxHighlighter
        style={a11yDark}
        language={value.language || 'text'}
      >
        {value.code}
      </SyntaxHighlighter>
    </div>
  )
}
