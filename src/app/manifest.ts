import { MetadataRoute } from 'next'

export default (): MetadataRoute.Manifest => ({
  name: 'Alex\'\s portoflio and blog site',
  short_name: 'Portoflio and blog site',
  description: 'Alex\'s Portfolio and blog site',
  start_url: 'https://ngjx.org',
  icons: [
    {
      'src': 'https://ngjx.org/siteScreenshot.png',
      'sizes': '787x368',
      'type': 'image/png'
    }
  ]
})
