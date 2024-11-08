
import { ThemeProvider } from "next-themes";
import { Poppins } from 'next/font/google';
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
  title: "Riziki Flour Millers",
  description: "Riziki Flour Millers is a flour milling company in Kenya that produces high-quality flour products for the Kenyan market.",
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
