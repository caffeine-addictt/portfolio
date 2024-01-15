import * as React from 'react'
import { Suspense } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@utils/tailwind'
import { urlFor } from '@lib/sanity/client'
import { ProjectItem } from '@lib/sanity/schema'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@components/ui/card'
import { Skeleton } from '@components/ui/skeleton'
import { buttonVariants } from '@components/ui/button'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'




export const ImageRender = async ({ icon, className }: { icon: any, className?: string }) => {
  if (!!icon) {
    try {
      return (
        <Image
          src={urlFor(icon).url()}
          alt='Project Image'
          width={500}
          height={500}
          className={cn('w-full h-full', className)}
        />
      )
    } catch (err) {console.log(err)}
  }

  return (
    <Image
      src='/images/defaultProjectImage.png'
      alt='Project Image'
      width={500}
      height={500}
      className={cn('w-full h-full', className)}
    />
  )
}




export const ProjectCards = async ({ data }: { data: ProjectItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>
        Looks like no projects were found, try a different search term!
      </p>
    ) : (data.map((project, key) => {
      const newStart = new Date(project.timeframe.start)
      const newEnd = project.timeframe.end && new Date(project.timeframe.end)

      return (
        <Card key={key} className='relative w-64 pt-2 px-2 h-fit rounded-sm overflow-hidden'>
          <Suspense fallback={<Skeleton className='w-60 h-60'/>}>
            <ImageRender icon={project.images.icon} className='w-60 h-60' />
          </Suspense>

          {/* Hover */}
          <div className='absolute inset-0 h-full w-full flex flex-col gap-2 justify-center items-center opacity-0 duration-300 hover:opacity-100 transition-all hover:backdrop-blur-sm'>
            <Link href={`/projects/${project.slug}`} className='w-full h-full absolute inset-0' />
            <div className={cn(buttonVariants({ variant: 'secondary' }))}>
              Learn more
              <ArrowTopRightIcon className='h-4 w-4 ml-2' />
            </div>
          </div>


          {/* Title */}
          <CardHeader>
            <CardTitle>
              {project.title}
            </CardTitle>
          </CardHeader>

          {/* Desc */}
          <CardContent>
            <CardDescription>
              {project.description.short}
            </CardDescription>
          </CardContent>

          <CardFooter className='flex flex-col items-start gap-2'>
            {/* Technologies */}
            {!!project.technologies?.length ? (
              <p className='flex flex-wrap gap-1'>
                {project.technologies.map((tech, key) => (
                  <span key={key} className='text-sm font-light bg-accent-light dark:bg-accent-dark p-1 px-2 block rounded'>
                    {tech.name}
                  </span>
                ))}
              </p>
            ) : (
              <p className='text-sm font-light bg-accent-light dark:bg-accent-dark p-1 px-2 block rounded'>Unspecified</p>
            )}


            {/* Date */}
            <p className='text-sm font-light'>
              {newStart.getUTCMonth()+1}/{newStart.getUTCFullYear()}
              -
              {newEnd ? `${newEnd.getUTCMonth()+1}/${newEnd.getUTCFullYear()}` : 'Present'}
            </p>
          </CardFooter>
        </Card>
    )}))}
  </>
)




export const ProjectCardsSkeleton = ({ cardCount }: { cardCount: number }) => {
  return (
    <>
      {[...Array(cardCount)].map((_, key) => (
        <Card key={key} className='w-64 h-fit pt-2 px-2 rounded-sm overflow-hidden'>
          <Skeleton className='w-60 h-60' />

          {/* Title */}
          <CardHeader>
            <CardTitle>
              <Skeleton className='w-40 h-6' />
            </CardTitle>
          </CardHeader>

          {/* Desc */}
          <CardContent>
            <div className='text-sm text-neutral-500 dark:text-neutral-400'>
              <Skeleton className='w-20 h-4 mb-1' />
              <Skeleton className='w-24 h-4' />
            </div>
          </CardContent>

          <CardFooter className='flex flex-col items-start gap-2'>
            {/* Technologies */}
            <div className='flex flex-wrap gap-1'>
              {[...Array(3)].map((tech, key) => (
                <Skeleton key={key} className='w-10 h-7' />
              ))}
            </div>

            {/* Date */}
            <Skeleton className='w-14 h-5' />
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
