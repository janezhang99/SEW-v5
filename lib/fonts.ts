import { Mona_Sans as FontSans, Content as FontHeading } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontHeading = FontHeading({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-heading",
})
