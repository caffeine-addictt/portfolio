import { MetadataRoute } from 'next'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  // const projects = await sanityClient.fetch(`*[_type == "project"]`)
  // const blog = await sanityClient.fetch(`*[_type == "blog"]`)

  const fetchedData: MetadataRoute.Sitemap = []

  return [
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/about` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects` },
    ...fetchedData
  ]
}
export default sitemap
