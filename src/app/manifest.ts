import { MetadataRoute } from 'next'

export default (): MetadataRoute.Manifest => ({
  name: 'Alex\'s portoflio and blog site',
  short_name: 'Portoflio and blog site',
  description: 'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
  start_url: 'https://ngjx.org',
  icons: [
    {
      'src': 'https://ngjx.org/siteScreenshot.png',
      'sizes': '787x368',
      'type': 'image/png'
    }
  ]
})
