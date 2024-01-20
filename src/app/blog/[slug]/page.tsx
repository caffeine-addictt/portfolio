import * as React from 'react'
import { Suspense } from 'react'

import Image from 'next/image'
import { Metadata } from 'next'
import { escapeQueryString } from '@utils/strings'
import { urlFor, queryBlogs } from '@lib/sanity/client'

import { Skeleton } from '@components/ui/skeleton'
import { Separator } from '@components/ui/separator'
import { TooltipWrapper } from '@components/ui/tooltip'
import { ExternalLink, InternalLink } from '@components/ui/button'
import { EnforceTypographyStyling } from '@components/typography'




// SEO
export const generateStaticParams = async () => {
  const projects = await queryBlogs({ queryLength: 50, orderByRecency: true, lookingFor: ['"slug": slug.current'] })
  return projects.map((blog) => ({ slug: blog.slug }))
}

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const fetched = (await queryBlogs({ slug: escapeQueryString(slug), queryLength: 1, lookingFor: ['title', 'description'] }))

  if (!!!fetched.length) {
    return {
      title: 'Looks like this blog doesn\'t exist!',
      description: `Oops! Looks like this blog doesn't exist! Check out my other blogs instead at ${process.env.NEXT_PUBLIC_BASE_URL}/blog!`
    }
  }

  const data = fetched[0]
  return {
    title: data.title,
    description: data.description.short,
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.description.short
    }
  }
}




// Render Logic
const BlogPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const fetched = await queryBlogs({ slug: escapeQueryString(slug), queryLength: 1 })

  if (!!!fetched.length) {
    return (
      <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className='mt-8 flex w-[80%] flex-col items-center max-sm:w-[97.5%]'>
          <h1 className='mx-auto w-fit text-5xl font-bold sm:w-[50%]'>
            <span className='block text-center text-base uppercase tracking-wide text-accent-light dark:text-accent-dark'>Alex Ng - Blog</span>
            <span className='mt-2 block text-center text-5xl leading-8 tracking-tight sm:text-6xl'>Looks like this blog doesn&apos;t exist!</span>
          </h1>

          <TooltipWrapper text='Check out my other blogs!' asChild>
            <InternalLink href={`${process.env.NEXT_PUBLIC_BASE_URL}/blog`} variant='ghost' className='mt-8 text-base font-light'>
              Check out my other blogs instead!
            </InternalLink>
          </TooltipWrapper>
        </div>
      </div>
    )
  }


  const data = fetched[0]
  const newPublished = new Date(data.timeframe.published)
  const newUpdated = (data.timeframe.updated !== data.timeframe.published) && new Date(data.timeframe.updated)

  return (
    <div className='mb-8 mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className='mt-8 flex w-[80%] flex-col items-center max-sm:w-[97.5%]'>

        {/* Header */}
        <h1 className='mx-auto w-fit text-5xl font-bold sm:w-[50%]'>
          <span className='block text-center text-base uppercase tracking-wide text-accent-light dark:text-accent-dark'>Alex Ng - Blog</span>
          <span className='mt-2 block text-center text-5xl leading-8 tracking-tight sm:text-6xl'>{data.title}</span>
        </h1>

        {/* Time */}
        <p className='mt-2 text-base font-light'>
          Published: {newPublished.getUTCMonth()+1}/{newPublished.getUTCFullYear()}
          {newUpdated ? `&nbsp;&nbsp;Updated: ${newUpdated.getUTCMonth()+1}/${newUpdated.getUTCFullYear()}` : ''}
        </p>

        {/* Separator */}
        <Separator className='my-4 w-[30%]' />


        {/* Technology stack */}
        {!!data.technologies?.length && (
          <div className='mb-4 flex w-fit flex-wrap gap-2'>
            {data.technologies.map((tech, index) => (
              <TooltipWrapper key={index} text={tech.name} asChild>
                <ExternalLink href={tech.href} variant='outline' size='icon' className='relative'>
                  <Suspense fallback={<Skeleton className='relative h-full w-full' />}>
                    {tech?.icon?.dark && tech?.icon?.light ? (
                      <>
                        <Image
                          src={urlFor(tech.icon.light).url()}
                          alt='/images/dark.svg'
                          width={16}
                          height={16}
                          className='absolute h-6 w-6 scale-100 transition-all dark:scale-0'
                        />
                        <Image
                          src={urlFor(tech.icon.dark).url()}
                          alt='/images/light.svg'
                          width={16}
                          height={16}
                          className='absolute h-6 w-6 scale-0 transition-all dark:scale-100'
                        />
                      </>
                    ) : (
                      <>
                        {tech.icon?.dark || tech.icon?.light ? (
                          <Image
                            src={tech.icon.dark ? urlFor(tech.icon.dark).url() : urlFor(tech.icon.light).url()}
                            alt='/images/dark.svg'
                            width={16}
                            height={16}
                            className='absolute h-full w-full scale-100 transition-all dark:scale-0'
                          />

                        ) : (
                          <>
                            <Image
                              src='/images/dark.svg'
                              alt='/images/dark.svg'
                              width={16}
                              height={16}
                              className='absolute h-6 w-6 scale-100 transition-all dark:scale-0'
                            />
                            <Image
                              src='/images/light.svg'
                              alt='/images/light.svg'
                              width={16}
                              height={16}
                              className='absolute h-6 w-6 scale-0 transition-all dark:scale-100'
                            />
                          </>
                        )}
                      </>
                    )}
                  </Suspense>
                </ExternalLink>
              </TooltipWrapper>
            ))}
          </div>
        )}


        {/* Short description */}
        <p className='text-lg'>
          {data.description.short}
        </p>


        {/* Image */}
        {data.images?.image && (
          <div className='mt-8 flex aspect-video h-96 max-h-96 w-full items-center overflow-hidden rounded-lg border'>
            <Suspense fallback={<HeaderImageSkeleton />}>
              <HeaderImage imageObj={data.images.image} />
            </Suspense>
          </div>
        )}


        {/* Content */}
        <EnforceTypographyStyling
          className='my-8 w-[80%] max-sm:w-[97.5%]'
          value={data.description.long}
        />

      </div>
    </div>
  )
}
export default BlogPage




// Image
const HeaderImageSkeleton = () => <Skeleton className='h-96 w-screen'/>
const HeaderImage = async ({ imageObj }: { imageObj: any }) => {
  if (imageObj) {
    try {
      return (
        <Image
          src={urlFor(imageObj).url()}
          alt='Project Image'
          width={1600}
          height={1200}
          className='h-full w-full'
          loading='eager'
          priority
        />
      )
    }
    catch (err) {console.log(err)}
  }

  return (
    <Image
      src='/images/defaultProjectImage.png'
      alt='Project Image'
      width={1600}
      height={1200}
      className='h-full w-full'
      loading='eager'
      priority
    />
  )
}
