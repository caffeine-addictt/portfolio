import { MetadataRoute } from 'next'

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Alex\'s portoflio and blog site',
  short_name: 'Portoflio and blog site',
  description: 'Hi! I am a full stack developer and hobbist hacker based in Singapore! Interested to learn more? Check out my portfolio!',
  start_url: 'https://ngjx.org',
  icons: [
    {
      'src': 'https://ngjx.org/images/siteImage.png',
      'sizes': '709x288',
      'type': 'image/png'
    }
  ]
})
export default manifest
