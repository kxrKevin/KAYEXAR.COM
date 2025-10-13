import React from 'react'

import fs from "fs";
import path from "path";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:'BIO',
}

export default function Page() {
  const filePath = path.join(process.cwd(), "public/biotext.txt");
  const bioText = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="fixed items-center justify-center h-full overflow-x-hidden">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover m-0 -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/bgvids/sitebg-bio.mp4" type="video/mp4" />
      </video>

      {/* For PC Screens */}
      <div className="h-[70%] bg-black p-6 mx-[10rem] hidden md:block overflow-y-scroll custom-scrollbar">
        <p className="text-white whitespace-pre-line text-center">{bioText}<br></br><a href="https://github.com/kxrKevin">GITHUB</a></p>
      </div>


      {/* For Phone Screens */}
      <div className="h-[70%] bg-black p-6 mx-[3rem] block md:hidden overflow-y-scroll custom-scrollbar">
        <p className="text-white whitespace-pre-line text-center">{bioText}<br></br><a href="https://github.com/kxrKevin">GITHUB</a></p>
      </div>
      
    </div>
  );
}
