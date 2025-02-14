import type { Metadata } from "next";
import {Space_Mono as FontSans} from 'next/font/google'
import "./globals.css";
import { cn } from "@/lib/utils";


const spaceMono = FontSans({
  subsets: ['latin'],
  variable: "--font-space",
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Task Manage",
  description: "Manage your tasks better",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-background font-sans antialiased', spaceMono.variable)}
      >
        {children}
      </body>
    </html>
  );
}
