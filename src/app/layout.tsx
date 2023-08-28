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

const inter = Nanum_Gothic_Coding({
  subsets: ['latin'],
  weight: '700'
})

const tokens = {
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsInR3b0ZhY3RvckF1dGgiOmZhbHNlLCJpYXQiOjE2OTMxODkzODcsImV4cCI6MTY5MzIzMjU4N30.SR1w63Mlzvq1jKdfwa3hz_FI6zOGMqb8jBoQ1IXunUU",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjk4MjY3LCJlbWFpbCI6ImRvaHl1bGVlQHN0dWRlbnQuNDJzZW91bC5rciIsImlhdCI6MTY5MzE4OTM4NywiZXhwIjoxNjkzNzk0MTg3fQ.krHZo_1OaRDUdhsZ2KaVLAtS1x_8al6ji5KyW7BE8LQ"
};

localStorage.setItem("accessToken", tokens.accessToken);
localStorage.setItem("refreshToken", tokens.refreshToken);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content='ft_transcendence project' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ft-ts</title>
        <link rel="icon" href="/favicon.ico" />
        </head>
      <body className={inter.className}>
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </body>
    </html>
  )
}
