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
    "YouTube Automation Workshop 3.0 | Zero to Pro Masterclass | The Okhai Memon Jamat",

  description:
    "Join YouTube Automation Workshop 3.0 presented by The Okhai Memon Jamat. Learn YouTube Automation, AI Tools, Content Strategy, Channel Growth, Monetization and practical workflows. Event Date: 05 July 2026, Sunday at 02:00 PM. Venue: 71 Banquet, Karachi.",

  keywords: [
    "YouTube Automation Workshop",
    "YouTube Automation Karachi",
    "YouTube Automation Pakistan",
    "AI Workshop Karachi",
    "AI Tools Training",
    "Content Creation",
    "Content Strategy",
    "YouTube Growth",
    "YouTube Monetization",
    "Faceless YouTube Channel",
    "YouTube Business",
    "Digital Skills Training",
    "YouTube Automation Workshop 3.0",
    "Zero to Pro Masterclass",
    "Okhai Memon Jamat",
    "OMJ",
    "Social Welfare Committee",
    "Karachi Workshop",
    "YouTube Training",
    "Creatomation Studio",
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
