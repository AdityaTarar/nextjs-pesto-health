import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-rubik',
  weight: '400'
})

export const fonts = {
  poppins,
}