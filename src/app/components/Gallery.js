"use client";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Image from "next/image";

const Gallery = ({ mediaItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentItem = mediaItems[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="gallery-container">
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer relative aspect-square overflow-hidden rounded-lg"
            onClick={() => openModal(index)}
          >
            {item.type === "image" ? (
              <Image
                src={item.src}
                alt={item.alt || `Gallery item ${index}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            ) : (
              <div className="relative h-full w-full bg-black">
                <video
                  src={item.src}
                  className="object-contain h-full w-full opacity-90"
                  loop
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white text-2xl z-50"
          >
            <FaTimes />
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh]">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white cursor-pointer p-3 rounded-full z-10 hover:bg-opacity-75 transition-all"
            >
              <FaChevronLeft size={24} />
            </button>

            {/* Media Display */}
            <div className="h-full w-full flex items-center justify-center">
              {currentItem.type === "image" ? (
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt || `Gallery item ${currentIndex}`}
                  width={1200}
                  height={800}
                  className="max-h-[90vh] object-contain"
                />
              ) : (
                <video
                  src={currentItem.src}
                  className="max-h-[90vh] max-w-full"
                  controls
                  autoPlay
                  playsInline
                />
              )}
            </div>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer z-10 hover:bg-opacity-75 transition-all"
            >
              <FaChevronRight size={24} />
            </button>
          </div>

          {/* Caption */}
          {/* {currentItem.caption && (
            <div className="absolute bottom-4 left-0 right-0 text-center text-white px-4">
              <p className="bg-black bg-opacity-50 inline-block px-4 py-2 rounded">
                {currentItem.caption}
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default Gallery;
