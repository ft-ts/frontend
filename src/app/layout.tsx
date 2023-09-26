'use client'
import './globals.css'
import { GlobalContextProvider } from './Context/store';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { FunctionComponent, PropsWithChildren } from 'react';

const ClientOnly: FunctionComponent<PropsWithChildren> = ({ children }) => children;
dynamic(() => Promise.resolve(ClientOnly), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientOnly>
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content='ft_transcendence project' />
          <title>ft-ts</title>
          <link rel="icon" href="/app_icon.ico" />
        </Head>
        <body>
          <GlobalContextProvider>
            {children}
          </GlobalContextProvider>
        </body>
      </html>
    </ClientOnly>
  )
}
