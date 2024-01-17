/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */

import * as React from 'react'
import Image from 'next/image'
import { ImageResponse } from 'next/og'

import { escapeQueryString } from '@utils/strings'
import { urlFor, queryProjects } from '@lib/sanity/client'


export const runtime = 'edge'
export const alt = 'About my project'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630
}


const og = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data = (await queryProjects({ slug: escapeQueryString(slug), queryLength: 1, lookingFor: ['images', 'title', 'description'] }))
  if (!data.length) return
  const fetched = data[0]
  
  return new ImageResponse(
    <div tw='relative flex w-full h-full flex items-center justify-center'>
      {/* Background */}
      <div tw='absolute flex inset-0'>
        {fetched.images?.image ? (
          <Image
            src={urlFor(fetched.images?.image).url()}
            alt={fetched.title}
            width={size.width}
            height={size.height}
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/siteImage.png`}
            alt={fetched.title}
            width={size.width}
            height={size.height}
          />
        )}

        {/* Overlay */}
        <div tw='absolute inset-0 bg-black bg-opacity-50 z-10' />
      </div>
      <div tw='flex flex-col text-neutral-50'>

        {/* Title */}
        <h1 tw='text-7xl font-bold'>
          {fetched.title}
        </h1>

        {/* Description */}
        <p tw='text-3xl mt-6 space-x-10 text-'>
          {fetched.description.short}
        </p>
      </div>
    </div>
  )
}
export default og
