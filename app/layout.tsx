
import { ThemeProvider } from "next-themes";
import { Poppins } from 'next/font/google';
import { Header } from '@/components/Header/index'
import { Sidebar } from '@/components/Sidebar/index'
import "flatpickr/dist/flatpickr.min.css";
import './globals.css'


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

  const poppy = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900" ],
  })

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppy.className} suppressHydrationWarning={true}>
      <body >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
