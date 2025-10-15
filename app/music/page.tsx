import React from 'react'
import fs from "fs";
import path from "path";
import type { Metadata } from 'next';
import { getArtistAlbums } from '@/lib/spotify';

export const metadata: Metadata = {
  title:'MUSIC',
}

const musicPage = async() => {

  const filePath = path.join(process.cwd(), "public/biotext.txt");
  const bioText = fs.readFileSync(filePath, "utf-8");

  const albumsData = await getArtistAlbums();
  const albums = albumsData.items || [];

  return (
    <div className="fixed inset-0 flex justify-center h-full items-center">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover m-0 -z-10"
        autoPlay
        loop
        muted
      >
        <source src="/bgvids/sitebg-music.mp4" type="video/mp4" />
      </video>

      <div className="h-[70%] w-[275px] p-2 overflow-y-scroll custom-scrollbar justify-center ">
    
        <div className="flex flex-col items-center ">
          {albums.map((album: any) => (
            <a
              key={album.id}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="block mb-3 text-center hover:scale-105 transition"
            >
            <div key={album.id} className="mb-3 pb-2 text-center bg-black">
              <img
                src={album.images?.[0]?.url}
                alt={album.name}
                className="mx-auto mb-1 w-60 h-60 object-cover"
              />
              <p className="text-white uppercase">{album.name}</p>
            </div>
            </a>
          ))}
        </div>
        
      </div>

    </div>
  )
}

export default musicPage
