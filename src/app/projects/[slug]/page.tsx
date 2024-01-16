import * as React from 'react'
import { Suspense } from 'react'

import Image from 'next/image'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import { escapeQueryString } from '@utils/strings'
import { urlFor, queryProjects } from '@lib/sanity/client'

import { Skeleton } from '@components/ui/skeleton'
import { Separator } from '@components/ui/separator'
import { InternalLink } from '@components/ui/button'
import { TooltipWrapper } from '@components/ui/tooltip'




// SEO
export const generateStaticParams = async () => {
  const projects = await queryProjects({ queryLength: 50, orderByRecency: true, lookingFor: ['"slug": slug.current'] })
  return projects.map((project) => ({ slug: project.slug }))
}

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const fetched = (await queryProjects({ slug: escapeQueryString(slug), queryLength: 1 }))

  if (!!!fetched.length) {
    return {
      title: 'Looks like this project doesn\'t exist!',
      description: `Oops! Looks like this project doesn't exist! Check out my other projects instead at ${process.env.NEXT_PUBLIC_BASE_URL}/projects!`
    }
  }

  const data = fetched[0]
  return {
    title: data.title,
    description: data.description.short
  }
}




// Render Logic
const ProjectPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const fetched = (await queryProjects({ slug: escapeQueryString(slug), queryLength: 1 }))

  if (!!!fetched.length) {
    return (
      <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className='mt-8 flex w-[80%] flex-col items-center max-sm:w-[97.5%]'>
          <h1 className='mx-auto w-fit text-5xl font-bold sm:w-[50%]'>
            <span className='block text-center text-base uppercase tracking-wide text-accent-light dark:text-accent-dark'>Alex Ng - Project</span>
            <span className='mt-2 block text-center text-5xl leading-8 tracking-tight sm:text-6xl'>Looks like this project doesn&apos;t exist!</span>
          </h1>

          <TooltipWrapper text='Check out my other projects!' asChild>
            <InternalLink href={`${process.env.NEXT_PUBLIC_BASE_URL}/projects`} variant='ghost' className='mt-8 text-base font-light'>
              Check out my other projects instead!
            </InternalLink>
          </TooltipWrapper>
        </div>
      </div>
    )
  }

  const data = fetched[0]
  const newStart = new Date(data.timeframe.start)
  const newEnd = data.timeframe.end && new Date(data.timeframe.end)

  return (
    <div className='mt-16 flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className='mt-8 flex w-[80%] flex-col items-center max-sm:w-[97.5%]'>

        {/* Header */}
        <h1 className='mx-auto w-fit text-5xl font-bold sm:w-[50%]'>
          <span className='block text-center text-base uppercase tracking-wide text-accent-light dark:text-accent-dark'>Alex Ng - Project</span>
          <span className='mt-2 block text-center text-5xl leading-8 tracking-tight sm:text-6xl'>{data.title}</span>
        </h1>

        {/* Time */}
        <p className='mt-2 text-base font-light'>
          {newStart.getUTCMonth()+1}/{newStart.getUTCFullYear()}
          -
          {newEnd ? `${newEnd.getUTCMonth()+1}/${newEnd.getUTCFullYear()}` : 'Present'}
        </p>

        {/* Separator */}
        <Separator className='my-4 w-[30%]' />

        {/* Short description */}
        <p className='text-lg'>
          {data.description.short}
        </p>


        {/* Image */}
        <div className='mt-8 flex aspect-video h-96 max-h-96 w-auto items-center overflow-hidden rounded-lg border'>
          <Suspense fallback={<HeaderImageSkeleton />}>
            <HeaderImage imageObj={data.images.image} />
          </Suspense>
        </div>


        {/* Content */}
        <div className='prose prose-xl my-8 w-[80%] text-text-light dark:prose-invert dark:text-text-dark max-sm:w-[97.5%]'>
          <PortableText value={data.description.long} />
        </div>

        <button type='button' onClick={async e => {'use server'; console.log(e)}}>test</button>
      </div>
    </div>
  )
}
export default ProjectPage




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
