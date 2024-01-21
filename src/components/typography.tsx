import * as React from 'react'
import { Suspense } from 'react'
import Image from 'next/image'

import { cn } from '@utils/tailwind'
import { urlFor, getImageDimensions } from '@lib/sanity/client'

import { PortableText } from '@portabletext/react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { Skeleton } from '@components/ui/skeleton'
import { Separator } from '@components/ui/separator'




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
    <div className='mx-auto my-8 flex w-screen max-h-screen max-w-full items-center overflow-hidden rounded-lg'>
      <Suspense fallback={<Skeleton className='h-screen w-screen' />}>
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
          width={width}
          height={height}
          loading='lazy'
          className='h-full w-full'
        />
      </Suspense>
    </div>
  )
}


interface codeComponentProps { value: { code: string | string[], language?: string, filename?: string, [key: string]: any} }
const codeComponent = ({ value }: codeComponentProps) => {
  return (
    <SyntaxHighlighter
      style={a11yDark}
      language={value.language || 'text'}
      PreTag={({ children, ...props }) => (
        <pre className='!m-0' {...props}>
          {(value.language || value.filename) && (
            <div className='mb-4 w-fit text-base text-gray-500'>
              {(value.language && value.filename) ? (
                <div className='flex flex-row items-center gap-2'>
                  {value.filename}
                  <Separator orientation='vertical' className='h-5 w-1' />
                  {value.language}
                </div>
              ) : (
                <>
                  {value.language || value.filename}
                </>
              )}
            </div>
          )}
          {children}
        </pre>
      )}
    >
      {value.code}
    </SyntaxHighlighter>
  )
}
