export const metadata = {
  title: "Grand Final Assessment & Test Paper | YouTube Automation Batch 2",
  description:
    "Official examination portal for Fundamentals of YouTube Automation Batch 2 organized by The Okhai Memon Jamat (OMJ) Social Welfare Committee. Verify student credentials, view gadgets checklist, and access your 150-mark test paper.",
  keywords: [
    "OMJ Test Paper",
    "YouTube Automation Assessment",
    "Batch 2 Final Exam",
    "The Okhai Memon Jamat",
    "OMJ SWC",
    "Husein Ebrahim Sports Complex",
  ],
  openGraph: {
    title: "Grand Final Assessment & Test Paper | YouTube Automation Batch 2",
    description:
      "Verify student credentials, view required gadgets, and access the 150-mark practical test paper.",
    url: "/test",
    images: [
      {
        url: "/grand-final-test-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Grand Final Test Paper Batch 2 - OMJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grand Final Assessment & Test Paper | YouTube Automation Batch 2",
    description:
      "Verify student credentials, view required gadgets, and access the 150-mark practical test paper.",
    images: ["/grand-final-test-poster.jpg"],
  },
};

export default function ExamTestLayout({ children }) {
  return <>{children}</>;
}

