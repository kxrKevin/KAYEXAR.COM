import Image from "next/image";
import Link from "next/link";
import type { Metadata } from 'next';
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>



export const metadata: Metadata = {
      title: 'KAYEXAR',
      description: 'A description of my page.',
    };

export default function Home() {
  return (
    <main>
      {/* For PC Screens */}
      <video className="fixed top-0 left-0 w-screen h-screen object-cover m-0 hidden md:block" autoPlay loop muted>
          <source src="/bgvids/sitebg-home.mp4" type="video/mp4" />
          Your browser does not support the video tag.
      </video>

      {/* For PHone Screens */}
            {/* For PC Screens */}
      <video className="fixed top-0 left-0 w-screen h-screen object-cover m-0 block md:hidden" autoPlay loop muted>
          <source src="/bgvids/sitebgv.mp4" type="video/mp4" />
          Your browser does not support the video tag.
      </video>

    </main>
  );
}



