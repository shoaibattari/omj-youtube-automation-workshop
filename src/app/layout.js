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
  title:
    "Fundamental of YouTube Automation | Batch 2 | The Okhai Memon Jamat",

  description:
    "Join 'Fundamental of YouTube Automation' Batch 2 Workshop presented by The Okhai Memon Jamat, Social Welfare Committee. Learn YouTube Channel Automation, Content Creation, and Online Earning. Venue: Husien Ebrahim Sports Complex & Community Centre, Hussainabad.",

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
  ],
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