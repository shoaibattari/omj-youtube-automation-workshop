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
    "HUNAR SE AMDANI TAK | Turn Your Skills into a Successful Business | The Okhai Memon Jamat",

  description:
    "Join 'HUNAR SE AMDANI TAK' Special Workshop for Women presented by The Okhai Memon Jamat. Learn AI Tools, Social Media, Personal Branding, and Online Selling. Trainer: Ms. Saba Vayani. Event Date: Wednesday, 5th August 2026 at 4:00 PM. Venue: Husien Ebrahim Sports Complex & Community Centre, Hussainabad.",

  keywords: [
    "Hunar Se Aamdani Tak",
    "Turn Your Skills into a Successful Business",
    "Women Workshop Karachi",
    "AI Tools Training",
    "Social Media Marketing",
    "Personal Branding",
    "Online Selling",
    "Okhai Memon Jamat",
    "OMJ",
    "Vocational Centre",
    "Social Welfare Committee",
    "Karachi Workshop",
    "Saba Vayani",
    "Creatomation Studio",
  ],
  icons: {
    icon: "/omj-logo.png",
    shortcut: "/omj-logo.png",
    apple: "/omj-logo.png",
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