"use client";
import { useEffect, useState } from "react";
import Countdown from "./components/Countdown";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Leadership from "./components/Leadership";
import Navbar from "./components/Navbar";
import ImageModal from "./components/ImageModal";
import Gallery from "./components/Gallery";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open modal when component mounts
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const mediaData = [
    {
      type: "image",
      src: "/main-poster.jpeg",
      alt: "main event",
      caption: "Event Details",
    },
    {
      type: "image",
      src: "/new-post.jpg",
      alt: "main event",
      caption: "Event Details",
    },
    {
      type: "image",
      src: "/main-poster-2.jpg",
      alt: "main event",
      caption: "Event Details",
    },
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <ImageModal
        isOpen={isModalOpen}
        onClose={handleClose}
        imageSrc="/main-poster.jpeg" // Update this path
      />
      <Navbar />
      <Hero />

      {/* <div>
        <Gallery mediaItems={mediaData} />
      </div> */}
      <Countdown />

      <CTA />
      <Leadership />
      <Footer />
    </div>
  );
}
