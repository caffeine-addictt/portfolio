import * as React from 'react'
import { Suspense } from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@utils/tailwind'
import { urlFor } from '@lib/sanity/client'
import { ProjectItem, BlogItem, SkillsItem } from '@lib/sanity/schema'

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
import { AspectRatio } from '@components/ui/aspect-ratio'
import { ArrowTopRightIcon } from '@radix-ui/react-icons'




export const ImageRender = async ({ icon, className }: { icon?: any, className?: string }) => {
  if (!!icon) {
    try {
      return (
        <Image
          src={urlFor(icon).url()}
          alt='Image'
          width={500}
          height={500}
          className={cn('h-full w-full', className)}
        />
      )
    } catch (err) {console.log(err)}
  }

  return (
    <Image
      src='/images/defaultCardPicture.png'
      alt='Image'
      width={500}
      height={500}
      className={cn('h-full w-full', className)}
    />
  )
}




export const ProjectCards = async ({ data }: { data: ProjectItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>
        Looks like no projects were found, try a different search term!
      </p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/projects/${project.slug}`,
            technologies: project?.technologies
          }}
          startingDate={new Date(project.timeframe.start)}
          endingDate={project.timeframe?.end ? new Date(project.timeframe.end) : undefined}
          renderEndDate={true}
        />
      )
    ))}
  </>
)




export const BlogCards = async ({ data }: { data: BlogItem[] }) => (
  <>
    {!!!data?.length ? (
      <p>
        Looks like no blogs were found, try a different search term!
      </p>
    ) : (
      data.map((project, key) => (
        <RenderCard
          key={key}
          cardData={{
            title: project.title,
            shortDescription: project.description.short,
            icon: project.images?.icon,
            link: `/blog/${project.slug}`,
            technologies: project?.technologies
          }}
          startingDate={new Date(project.timeframe?.published)}
          renderEndDate={false}
        />
      )
    ))}
  </>
)




interface RenderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardData: {
    title: string
    shortDescription: string
    link: string
    icon?: any
    technologies?: SkillsItem[]
  }
  startingDate: Date
  endingDate?: Date
  renderEndDate: boolean
}
const RenderCard = React.forwardRef<
  HTMLDivElement,
  RenderCardProps
>(({ cardData, startingDate, endingDate, renderEndDate, ...props }, ref) => (
  <Card ref={ref} {...props} className='relative h-fit w-64 overflow-hidden rounded'>
    <AspectRatio ratio={1/1}>
      <Suspense fallback={<Skeleton className='h-64 w-64'/>}>
        <ImageRender icon={cardData.icon} className='h-64 w-64' />
      </Suspense>
    </AspectRatio>

    {/* Hover */}
    <div className='absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 opacity-0 transition-all duration-300 hover:opacity-100 hover:backdrop-blur-sm'>
      <Link href={cardData.link} className='absolute inset-0 h-full w-full' />
      <div className={cn(buttonVariants({ variant: 'secondary' }))}>
        Learn more
        <ArrowTopRightIcon className='ml-2 h-4 w-4' />
      </div>
    </div>


    {/* Title */}
    <CardHeader>
      <CardTitle>
        {cardData.title}
      </CardTitle>
    </CardHeader>

    {/* Desc */}
    <CardContent>
      <CardDescription>
        {cardData.shortDescription}
      </CardDescription>
    </CardContent>

    <CardFooter className='flex flex-col items-start gap-2'>
      {/* Technologies */}
      {!!cardData.technologies?.length ? (
        <p className='flex flex-wrap gap-1'>
          {cardData.technologies.map((tech, key) => (
            <span key={key} className='block rounded bg-accent-light p-1 px-2 text-sm font-light text-text-dark dark:bg-accent-dark'>
              {tech.name}
            </span>
          ))}
        </p>
      ) : (
        <p className='block rounded bg-accent-dark p-1 px-2 text-sm font-light text-text-light dark:bg-accent-dark'>Unspecified</p>
      )}


      {/* Date */}
      <p className='text-sm font-light'>
        {startingDate.getUTCMonth()+1}/{startingDate.getUTCFullYear()}
        {renderEndDate && <>
          &nbsp;-&nbsp;
          {endingDate ? `${endingDate.getUTCMonth()+1}/${endingDate.getUTCFullYear()}` : 'Present'}
        </>}
      </p>
    </CardFooter>
  </Card>
))
RenderCard.displayName = 'RenderCard'




export const CardSkeleton = ({ cardCount }: { cardCount: number }) => (
  <>
    {[...Array(cardCount)].map((_, key) => (
      <Card key={key} className='h-fit w-64 overflow-hidden rounded'>
        <AspectRatio ratio={1/1} asChild>
          <Skeleton className='h-64 w-64' />
        </AspectRatio>

        {/* Title */}
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-40' />
          </CardTitle>
        </CardHeader>

        {/* Desc */}
        <CardContent>
          <div className='text-sm text-neutral-500 dark:text-neutral-400'>
            <Skeleton className='mb-1 h-4 w-20' />
            <Skeleton className='h-4 w-24' />
          </div>
        </CardContent>

        <CardFooter className='flex flex-col items-start gap-2'>
          {/* Technologies */}
          <div className='flex flex-wrap gap-1'>
            {[...Array(3)].map((tech, key) => (
              <Skeleton key={key} className='h-7 w-10' />
            ))}
          </div>

          {/* Date */}
          <Skeleton className='h-5 w-14' />
        </CardFooter>
      </Card>
    ))}
  </>
)
