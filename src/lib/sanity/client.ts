import { cache } from 'react'
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

import { ProjectItem, BlogItem, SkillsItem } from './schema'


/** Sanity client */
const client = createClient({
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  useCdn: false
})


/** Image builder */
export const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)


/** Get image dimensions */
export const getImageDimensions = (image: any): { width?: number, height?: number } => {
  const [,, dimensions] = /^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/.exec(image.asset._ref) || []
  const [width, height] = (dimensions || '').split('x').map(v => parseInt(v, 10))
  return {
    width: width,
    height: height
  }
}




// Fetch querys
export interface ProjectQuery {
  offset?: number
  queryLength?: number
  additionalConditionals?: string[],
  slug?: string | string[]
  tech?: string | string[],
  lookingFor?: string[],
  orderByRecency?: boolean,
  fetchAll?: boolean
}

export const queryProjects = cache(async ({
  offset = 0,
  queryLength = 10,
  additionalConditionals = [],
  slug,
  tech,
  lookingFor,
  orderByRecency = false,
  fetchAll = false
}: ProjectQuery): Promise<ProjectItem[]> => {
  if (offset < 0) throw new Error('Offset cannot be negative')
  if (queryLength < 0) throw new Error('Limit cannot be negative')

  const req = ['_type=="projects"', ...additionalConditionals]
  if (slug) Array.isArray(slug) ? req.push(`slug.current in ${JSON.stringify(slug)}`) : req.push(`slug.current == "${slug}"`)
  if (tech) Array.isArray(tech) ? req.push(`technologies[]->.name in ${JSON.stringify(tech)}`) : req.push(`technologies[]->.name == "${tech}"`)

  const params = lookingFor || [
    '...',
    '"slug": slug.current',
    'technologies[]->',
  ]

  const orderingConditions = orderByRecency ? ' | order(start_time desc)' : ''
  const splicing = fetchAll ? '' : `[${offset}...${queryLength+offset}]`
  const fetched = await client.fetch(`
    *[${req.join(' && ')}]${orderingConditions}{${params.join(',')}}${splicing}
  `)
  return Array.isArray(fetched) ? fetched : [fetched]
})




export type BlogQuery = ProjectQuery
export const queryBlogs = cache(async ({
  offset = 0,
  queryLength = 10,
  additionalConditionals = [],
  slug,
  tech,
  lookingFor,
  orderByRecency = false,
  fetchAll = false
}: BlogQuery): Promise<BlogItem[]> => {
  if (offset < 0) throw new Error('Offset cannot be negative')
  if (queryLength < 0) throw new Error('Limit cannot be negative')

  const req = ['_type=="blogs"', ...additionalConditionals]
  if (slug) Array.isArray(slug) ? req.push(`slug.current in ${JSON.stringify(slug)}`) : req.push(`slug.current == "${slug}"`)
  if (tech) Array.isArray(tech) ? req.push(`technologies[]->.name in ${JSON.stringify(tech)}`) : req.push(`technologies[]->.name == "${tech}"`)

  const params = lookingFor || [
    '...',
    '"slug": slug.current',
    'technologies[]->',
  ]

  const orderingConditions = orderByRecency ? ' | order(timeframe.published desc)' : ''
  const splicing = fetchAll ? '' : `[${offset}...${queryLength+offset}]`
  const fetched = await client.fetch(`
    *[${req.join(' && ')}]${orderingConditions}{${params.join(',')}}${splicing}
  `)
  return Array.isArray(fetched) ? fetched : [fetched]
})




export const getAllSkills = cache(async (): Promise<SkillsItem[]> => {
  const fetched = await client.fetch(`
    *[_type == "skills"]{
      ...,
      "slug": slug.current
    }
  `)
  return Array.isArray(fetched) ? fetched : [fetched]
})
