import * as React from 'react'
import { Suspense } from 'react'

import Image from 'next/image'
import { Metadata } from 'next'

import { Skeleton } from '@components/ui/skeleton'
import { urlFor, getProject, getAllProjects } from '@lib/sanity/client'




// SEO
export const generateStaticParams = async () => {
  const projects = await getAllProjects(5)
  return projects.map((project) => project.slug)
}

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }): Promise<Metadata> => {
  const data = await getProject(slug)
  return {
    title: data.title,
    description: data.description.long.join('\n'),
    openGraph: {
      title: data.title,
      description: data.description.long.join('\n')
    }
  }
}




// Render Logic
const ProjectPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data = await getProject(slug)

  return (
    <div className='flex min-h-screen min-w-full max-w-full flex-col items-center' style={{ minHeight: 'calc(100vh - 64px)' }}>
      <div className='w-[80%] max-sm:w-[97.5%] mt-8 flex flex-col items-center'>

        {/* Title */}
        <h1 className='text-5xl font-bold'>{data.title}</h1>

        {/* Image */}
        <div className='mt-2 mb-8 w-auto h-96 aspect-video flex items-center'>
          <Suspense fallback={<HeaderImageSkeleton />}>
            <HeaderImage imageObj={data.images.image} />
          </Suspense>
        </div>


        {/* Description */}
        <p className='text-lg'>
          {data.description.long.join('\n')}
        </p>

      </div>
    </div>
  )
}
export default ProjectPage




// Image
const HeaderImageSkeleton = () => <Skeleton className='h-full w-full'/>
const HeaderImage = async ({ imageObj }: { imageObj: any }) => {
  if (imageObj) {
    try {
      return (
        <Image
          src={urlFor(imageObj).url()}
          alt='Project Image'
          width={1600}
          height={1200}
          className='w-full h-full'
          loading='eager'
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
      className='w-full h-full'
      loading='eager'
    />
  )
}
