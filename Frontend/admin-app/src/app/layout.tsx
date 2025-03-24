import React from "react";
import {AdminProvider} from "./context/context"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdminProvider>
        <main className="main">{children}</main>
        </AdminProvider>
      </body>
    </html>
  );
}
