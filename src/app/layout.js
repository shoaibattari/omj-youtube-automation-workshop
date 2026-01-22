import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // Title poster ke mutabiq update kiya gaya hai
  title: "Fundamentals of YouTube Automation Course | OMJ Karachi",
  description:
    "Learn to build income-generating YouTube channels. Batch starts 1st Feb 2026. 8 Power-Packed Sessions every Sunday at Husein Ebrahim Sports Complex.", //
  keywords: [
    "YouTube Automation",
    "Faceless Channels",
    "OMJ Course",
    "Digital Income Karachi",
    "Okhai Memon Jamat",
  ],
  authors: [{ name: "Okhai Memon Jamat" }],
  openGraph: {
    title: "YouTube Automation Course Admission Open - OMJ",
    description:
      "Turn your ideas into income. Exclusive 50% OFF for Memon Community Students!", //
    url: "https://omj-youtube-automation-course.vercel.app/",
    siteName: "OMJ YouTube Course",
    images: [
      {
        url: "/main-poster.jpg", // Poster image path
        width: 1200,
        height: 630,
        alt: "YouTube Automation Course Poster",
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
        <ToastContainer position="top-right" autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
