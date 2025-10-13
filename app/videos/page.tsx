import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:'VIDEOS',
}

const page = () => {
  return (
    <div className="flex items-center justify-center h-full overflow-x-hidden">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover m-0 -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/bgvids/sitebg-videos.mp4" type="video/mp4" />
      </video>
      <div className="p-6 px-20 w-full h-full flex items-center justify-center">
      </div>
    </div>
  )
}

export default page
