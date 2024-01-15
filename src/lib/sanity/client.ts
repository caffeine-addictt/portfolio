import { cache } from 'react'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { ProjectItem } from './schema'


/** Sanity client */
export const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  useCdn: false
})


/** Image builder */
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)




// Fetch querys
export const getAllProjects = (async (offset: number = 0, limit: number = 10): Promise<ProjectItem[]> => {
  const data = await client.fetch(`
    *[_type == "projects"]{
      ...,
      "slug": slug.current,
      title,
      "description": {
        "short": description.short,
        "long": description.long
      },
      links,
      technologies,
      timeframe
    }[${offset}...${limit}]
  `)
  return data
})

export const getProject = (async (slug: string): Promise<ProjectItem> => {
  const data = await client.fetch(`
    *[_type == "projects" && slug.current == "${slug.toLowerCase()}"]{
      ...,
      "slug": slug.current,
      title,
      "description": {
        "short": description.short,
        "long": description.long
      },
      links,
      technologies,
      timeframe
    }[0]
  `)
  return data
})
