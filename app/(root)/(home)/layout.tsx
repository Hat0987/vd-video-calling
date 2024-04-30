import { Metadata } from 'next';
import { ReactNode } from 'react';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Welcome to VD Connect, A workspace for your team, powered by Voie Digital.',
  icons: {
    icon: 'icons/logo.png'
  },

  openGraph: {
    images: [
      {
        url: 'http://localhost:3000/icons/logo-preview.png',
        width: 1200, // Set the width of the image
        height: 630, // Set the height of the image
        alt: 'Preview Image' // Alt text for the image
      }
    ]
  }

};

const RootLayout = ({ children }: Readonly<{children: ReactNode}>) => {
  return (
    <main className="relative">
      <Navbar />

      <div className="flex">
        <Sidebar />
        
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default RootLayout;
