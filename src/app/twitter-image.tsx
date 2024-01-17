/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from 'next/og'
 
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
    (
      <div style={{ background: '#020104', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/siteImage.png`}
          alt={alt}
        />
      </div>
    ), { ...size }
  )
}
export default OGImage
