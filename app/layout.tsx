// app/layout.tsx
import type { Metadata } from "next";
import Script from "next/script"; // For Google CSE
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "Rakibul Ahsan Minar | Writer • Poet • Nasheed Artist",
  description:
    "Official portfolio of Rakibul Ahsan Minar — Bangladeshi writer, poet, songwriter, and nasheed artist. Explore published books, Islamic nasheed, songs, and writings.",
  generator: "Next.js + v0.app",
  keywords: [
    "Rakibul Ahsan Minar",
    "Bangladeshi poet",
    "Islamic nasheed artist",
    "Bangladeshi writer",
    "books",
    "songs",
    "poetry",
    "lyrics",
  ],
  authors: [
    {
      name: "Rakibul Ahsan Minar",
      url: "https://rakibul-ahsan-minar.vercel.app",
    },
  ],
  creator: "Rakibul Ahsan Minar",
  publisher: "Rakibul Ahsan Minar",
  metadataBase: new URL("https://rakibul-ahsan-minar.vercel.app"),
  openGraph: {
    title: "Rakibul Ahsan Minar | Official Portfolio",
    description:
      "Writer • Poet • Songwriter • Nasheed Artist. Discover books, Islamic nasheed, and poetry by Rakibul Ahsan Minar.",
    url: "https://rakibul-ahsan-minar.vercel.app",
    siteName: "Rakibul Ahsan Minar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://rakibul-ahsan-minar.vercel.app/images/rakibul-with-book.jpg",
        width: 1200,
        height: 630,
        alt: "Rakibul Ahsan Minar with his book",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakibul Ahsan Minar | Official Portfolio",
    description:
      "Explore the books, poetry, and nasheed songs of Rakibul Ahsan Minar.",
    creator: "@your_twitter_handle", // replace with your real Twitter handle
    images: [
      "https://rakibul-ahsan-minar.vercel.app/images/rakibul-with-book.jpg",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Canonical link for SEO */}
        <link rel="canonical" href="https://rakibul-ahsan-minar.vercel.app" />
      </head>
      <body className="antialiased bg-white text-slate-800">
        {/* Google Custom Search Engine */}
        <Script
          strategy="afterInteractive"
          src="https://cse.google.com/cse.js?cx=9546ff0f395374aed"
        />
        {children}
      </body>
    </html>
  );
}
