import { MetadataRoute } from 'next'

export default (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    allow: '/',
  },
  sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
})
