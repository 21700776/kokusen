import { Fira_Code as FontMono, Inter as FontSans, Inter, Nanum_Myeongjo, Noto_Sans_KR } from 'next/font/google';


export const inter = Inter({ subsets: ['latin'] });

export const NotoSansKR = Noto_Sans_KR({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

  export const NanumMyeongjo = Nanum_Myeongjo({
    weight: ['400', '700'],
    subsets: ['latin'],
  });

  export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  })
  
  export const fontMono = FontMono({
    subsets: ["latin"],
    variable: "--font-mono",
  })