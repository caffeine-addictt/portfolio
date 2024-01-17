import { ImageResponse } from 'next/og'
import Image from 'next/image'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
// Image generation
const OGImage = () => {
  return new ImageResponse(
    <Image
      src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/siteImage.png`}
      alt={alt}
      width={size.width}
      height={size.height}
    />
  )
}
export default OGImage
