import { MetadataRoute } from 'next'

import { queryProjects } from '@lib/sanity/client'


const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const projects = await queryProjects({ fetchAll: true, lookingFor: ['"slug": slug.current'] })
  // const blog = await sanityClient.fetch(`*[_type == "blog"]`)

  const fetchedData: MetadataRoute.Sitemap = []

  projects.forEach((project) => {
    fetchedData.push({ url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${project.slug}` })
  })

  return [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/about` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects` },
    ...fetchedData
  ]
}
export default sitemap
