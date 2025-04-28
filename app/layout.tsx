import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  display: 'swap',
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  display: 'swap',
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://givemymenu.com'),
  title: "givemymenu.com - Digital QR Menus for Restaurants",
  description: "Create beautiful QR codes for your restaurant menus, making contactless dining easy, efficient and elegant.",
  keywords: ["menu", "QR code", "restaurant", "contactless dining", "digital menu", "restaurant tech", "QR menu"],
  authors: [{ name: "givemymenu.com" }],
  creator: "givemymenu.com",
  publisher: "givemymenu.com",
  robots: "index, follow",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "givemymenu.com - Digital QR Menus for Restaurants",
    description: "Create beautiful QR codes for your restaurant menus, making contactless dining easy, efficient and elegant.",
    url: "https://givemymenu.com",
    siteName: "givemymenu.com",
    images: [{
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'givemymenu.com - Digital QR Menus',
    }],
    locale: 'en_US',
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "givemymenu.com - Digital QR Menus for Restaurants",
    description: "Create beautiful QR codes for your restaurant menus, making contactless dining easy, efficient and elegant.",
    creator: "@givemymenu",
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100`}
      >
        {children}
        
        {/* Structured data for rich results */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "givemymenu.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Create beautiful QR codes for your restaurant menus, making contactless dining easy, efficient and elegant."
            })
          }}
        />
      </body>
    </html>
  );
}
