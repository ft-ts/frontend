import './globals.css'
import type { Metadata } from 'next'
import { Nanum_Gothic_Coding } from 'next/font/google'

const inter = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: '700'
})

export const metadata: Metadata = {
  title: 'ft-ts',
  description: 'ft_transcendence project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
