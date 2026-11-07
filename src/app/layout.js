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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://omj-youtube-automation.vercel.app"
  ),
  title: {
    default:
      "Fundamental of YouTube Automation | Batch 2 | The Okhai Memon Jamat",
    template: "%s | The Okhai Memon Jamat",
  },
  description:
    "Join 'Fundamental of YouTube Automation' Batch 2 Workshop presented by The Okhai Memon Jamat, Social Welfare Committee. Learn YouTube Channel Automation, Content Creation, and Online Earning. Venue: Husein Ebrahim Sports Complex & Community Centre, Hussainabad.",
  keywords: [
    "Fundamental of YouTube Automation",
    "YouTube Automation Workshop",
    "Batch 2",
    "YouTube Channel Automation",
    "Online Earning",
    "Content Creation",
    "Okhai Memon Jamat",
    "OMJ",
    "Social Welfare Committee",
    "Karachi Workshop",
    "YouTube Training",
    "Grand Final Assessment",
    "Test Paper",
  ],
  authors: [
    {
      name: "The Okhai Memon Jamat - Social Welfare Committee",
      url: "https://okhaimemonjamat.org",
    },
  ],
  creator: "The Okhai Memon Jamat",
  publisher: "The Okhai Memon Jamat",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/omj-logo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/omj-logo.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "OMJ YouTube Automation Workshop",
    title:
      "Fundamental of YouTube Automation | Batch 2 | The Okhai Memon Jamat",
    description:
      "Official Portal for YouTube Automation Batch 2 Workshop & Grand Final Assessment by The Okhai Memon Jamat Social Welfare Committee.",
    images: [
      {
        url: "/main-poster-2.jpg",
        width: 1200,
        height: 630,
        alt: "Fundamental of YouTube Automation Batch 2",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Fundamental of YouTube Automation | Batch 2 | The Okhai Memon Jamat",
    description:
      "Official Portal for YouTube Automation Batch 2 Workshop & Grand Final Assessment.",
    images: ["/main-poster-2.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
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