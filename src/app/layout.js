import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OMJ YouTube Automation Free Workshop | OMJ Karachi",
  description:
    "Join Ms. Saba Vayani on 18 Jan 2026 at Husein Ebrahim Sports Complex. Learn faceless channel creation, AI tools, and secret growth strategies.",
  keywords: [
    "YouTube Automation",
    "Faceless Channels",
    "OMJ Workshop",
    "Saba Vayani",
    "Digital Income Karachi",
  ],
  authors: [{ name: "Okhai Memon Jamat" }],
  openGraph: {
    title: "YouTube Automation Free Workshop - OMJ",
    description:
      "Learn to build a faceless YouTube empire. Free registration now open!",
    url: "https://your-domain.com", // Replace with your actual URL
    siteName: "OMJ YouTube Workshop",
    images: [
      {
        url: "/main-poster.jpg", // This will use your flyer image when sharing the link
        width: 1200,
        height: 630,
        alt: "YouTube Automation Workshop Flyer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
