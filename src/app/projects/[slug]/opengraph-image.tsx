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
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
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
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(0,0,0)', opacity: 0.5, zIndex: 10 }}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(250,250,250)' }}>

        {/* Title */}
        <h1 style={{ fontSize: '4.5rem', fontWeight: 700, textAlign: 'center' }}>
          {fetched.title}
        </h1>

        {/* Description */}
        <p style={{ fontSize: '1.875rem', lineHeight: '2.25rem', marginTop: '1.5rem', fontWeight: 400, textAlign: 'center', marginLeft: '2.5rem', marginRight: '0px' }}>
          {fetched.description.short}
        </p>
      </div>
    </div>
  )
}
export default og
