import { cache } from 'react'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { ProjectItem, SkillsItem } from './schema'


/** Sanity client */
const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  useCdn: false
})


/** Image builder */
const builder = imageUrlBuilder(client)
const urlFor = (source: any) => builder.image(source)




// Fetch querys
const getAllProjects = (async (offset: number = 0, limit: number = 10): Promise<ProjectItem[]> => {
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
      technologies[]->{
        ...,
        name,
        href,
        start_time
      },
      timeframe
    }[${offset}...${limit}]
  `)
  return data
})

const getProject = (async (slug: string): Promise<ProjectItem> => {
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
      technologies[]->{
        ...,
        name,
        href,
        start_time
      },
      timeframe
    }[0]
  `)
  return data
})




const getAllSkills = (async (): Promise<SkillsItem[]> => {
  const data = await client.fetch(`
    *[_type == "skills"]{
      ...,
      "slug": slug.current,
      name,
      href,
      start_time
    }
  `)
  return data
})




export {
  client,
  urlFor,
  getProject,
  getAllSkills,
  getAllProjects
}
