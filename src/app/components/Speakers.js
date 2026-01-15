"use client";
import { motion } from "framer-motion";
import { FaGlobe, FaLinkedinIn, FaTwitterSquare, FaBolt } from "react-icons/fa";
import { speakers } from "../data/speakers";
import Image from "next/image";

export default function Speakers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden border-t border-neon/30">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 opacity-10 pattern-grid-lg text-neon/10" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-neon"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 60],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 text-center relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="flex justify-center items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <FaBolt className="text-neon text-2xl mr-3 glow" />
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-neon glow-text uppercase tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            FEATURED SPEAKERS
          </motion.h2>
          <FaBolt className="text-neon text-2xl ml-3 glow" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {speakers.map((speaker, index) => (
            <motion.div
              key={index}
              className="bg-[#111111] rounded-xl border-2 border-neon/50 cursor-default relative overflow-hidden"
              variants={itemVariants}
              whileHover={{
                y: -5,
                scale: 1.02,
                boxShadow: "0 10px 20px rgba(166, 241, 0, 0.2)",
                borderColor: "#F9C900",
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
            >
              <div className="bg-neon/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex relative z-10">
                <div className="w-full h-full">
                  <Image
                    src={speaker.img}
                    alt={speaker.img}
                    width={100}
                    height={100}
                    sizes="100vw"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <div>
                  <h3 className="text-2xl font-bold mb-2 uppercase text-yellow">
                    {speaker.name}
                  </h3>
                  <p className="text-orange mb-3 font-medium">{speaker.role}</p>
                  <p className="text-neon mb-6 text-lg font-semibold bg-dark/50 px-4 py-2 rounded-lg border border-neon/30">
                    {speaker.topic}
                  </p>

                  <div className="flex justify-center space-x-5">
                    <motion.a
                      href="#"
                      aria-label={`${speaker.name} LinkedIn`}
                      whileHover={{
                        scale: 1.25,
                        y: -2,
                        color: "#F9C900",
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      className="bg-dark p-3 rounded-full border border-neon/30 hover:border-yellow"
                    >
                      <FaLinkedinIn className="text-xl text-neon" />
                    </motion.a>
                    <motion.a
                      href="#"
                      aria-label={`${speaker.name} Twitter`}
                      whileHover={{
                        scale: 1.25,
                        y: -2,
                        color: "#F9C900",
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      className="bg-dark p-3 rounded-full border border-neon/30 hover:border-yellow"
                    >
                      <FaTwitterSquare className="text-xl text-neon" />
                    </motion.a>
                    <motion.a
                      href="#"
                      aria-label={`${speaker.name} Website`}
                      whileHover={{
                        scale: 1.25,
                        y: -2,
                        color: "#F9C900",
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        },
                      }}
                      className="bg-dark p-3 rounded-full border border-neon/30 hover:border-yellow"
                    >
                      <FaGlobe className="text-xl text-neon" />
                    </motion.a>
                  </div>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
