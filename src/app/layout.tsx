'use client'
import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic_Coding } from 'next/font/google'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { GlobalContextProvider } from './Context/store';

const inter = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: '700'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content='ft_transcendence project' />
        <title>ft-ts</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
      <body className={inter.className}>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  )
}
