'use client'
import './globals.css'
import { Nanum_Gothic_Coding } from 'next/font/google'
import { GlobalContextProvider } from './Context/store';
import Head from 'next/head';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content='ft_transcendence project' />
        <title>ft-ts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
