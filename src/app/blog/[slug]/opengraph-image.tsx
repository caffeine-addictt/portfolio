/* eslint-disable @next/next/no-img-element */

import * as React from 'react'
import { ImageResponse } from 'next/og'

import { escapeQueryString } from '@utils/strings'
import { urlFor, queryBlogs } from '@lib/sanity/client'


export const runtime = 'edge'
export const alt = 'About my blog'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630
}


const og = async ({ params: { slug } }: { params: { slug: string } }) => {
  const data = (await queryBlogs({ slug: escapeQueryString(slug), queryLength: 1, lookingFor: ['images', 'title', 'description'] }))
  if (!data.length) return
  const fetched = data[0]
  
  return new ImageResponse(
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', inset: 0, display: 'flex' }}>
        {fetched.images?.image ? (
          <img
            src={urlFor(fetched.images?.image).url()}
            alt={fetched.title}
          />
        ) : (
          <img
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/siteImage.png`}
            alt={fetched.title}
          />
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(250,250,250)', textShadow: '0 0 20px rgb(0,0,0)', backdropFilter: 'blur(50px)', background: 'rgba(0,0,0,0.7)', padding: '2rem' }}>

        {/* Title */}
        <h1 style={{ fontSize: '5rem', fontWeight: 700, textAlign: 'center' }}>
          {fetched.title}
        </h1>

        {/* Description */}
        <p style={{ fontSize: '1.875rem', lineHeight: '2.25rem', marginTop: '1.5rem', fontWeight: 400, textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          {fetched.description.short}
        </p>
      </div>
    </div>, { ...size }
  )
}
export default og
