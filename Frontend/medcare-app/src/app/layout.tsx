"use client"
import "./globals.css"
import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head"; 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { AuthProvider } from "./context/context"; 
config.autoAddCss = false
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const shouldHideFooter = ["/", "/login", "/register"].includes(pathname);
  // const isBookingRoute = pathname.startsWith("/booking/");
  return (<AuthProvider>
    <html lang="en">
       <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
      
        <Header/>
        <main className="main">{children}</main>
        {!shouldHideFooter && <Footer />}
      </body>
    </html> </AuthProvider>
  );
}
