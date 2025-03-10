import "./globals.css"
import Header from "./components/Header";
import Head from "next/head"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
      </body>
    </html>
  );
}
