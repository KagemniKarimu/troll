import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "troll",
  description: "an app for monitoring pesky bridge txs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
