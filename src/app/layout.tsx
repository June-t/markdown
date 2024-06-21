import type { Metadata } from "next";
import { Inter, Ubuntu_Mono } from "next/font/google";
// style
import "@/style/main.css";
import "highlight.js/styles/tokyo-night-dark.css";

// typography
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ubuntuMono = Ubuntu_Mono({
  variable: "--font-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Markdown",
  description: "It's a simple markdown editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} + ${ubuntuMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
