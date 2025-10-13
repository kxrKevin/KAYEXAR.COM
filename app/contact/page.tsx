import React from 'react'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:'CONTACT',
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
        <source src="/bgvids/sitebg-contact.mp4" type="video/mp4" />
      </video>
      <div className="p-6 px-20 w-full h-full flex items-center justify-center text-white">
        
        <div className="w-[275px] h-[100px] my-[10%] flex items-center justify-center bg-black p-2">
          <p className="text-white text-3xl text-center">KAYEXARMUSIC.COM</p>
        </div>
      </div>
    </div>
  )
}

export default page
