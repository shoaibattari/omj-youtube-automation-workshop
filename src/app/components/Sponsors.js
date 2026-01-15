import Link from "next/link";
import { FaCrown, FaGem, FaStar } from "react-icons/fa";

export default function Sponsors() {
  const sponsors = [
    {
      name: "SRL COMMERCIEY",
      tier: "Presenting Sponsor",
      icon: <FaCrown className="text-yellow text-3xl mb-2 glow" />,
      highlight: "border-2 border-yellow",
    },
    {
      name: "TECHNOLOGY PARTNER",
      tier: "Platinum Sponsor",
      icon: <FaGem className="text-neon text-3xl mb-2 glow" />,
      highlight: "border-2 border-neon",
    },
    {
      name: "INNOVATION PARTNER",
      tier: "Gold Sponsor",
      icon: <FaStar className="text-orange text-3xl mb-2 glow" />,
      highlight: "border-2 border-orange",
    },
  ];

  return (
    <section className="py-16 bg-dark text-white border-t border-neon relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-neon animate-pulse"></div>
        <div className="absolute bottom-1/4 right-20 w-6 h-6 rounded-full bg-yellow animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-neon glow-text uppercase tracking-wider">
          Our Sponsors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className={`bg-[#1A1A1A] p-8 flex flex-col justify-center items-center rounded-lg ${sponsor.highlight} hover:scale-105 transition-all duration-300 shadow-lg`}
            >
              {sponsor.icon}
              <h3 className="text-2xl font-bold text-white mb-1">
                {sponsor.name}
              </h3>
              <p
                className={`text-lg font-medium ${
                  index === 0
                    ? "text-yellow"
                    : index === 1
                    ? "text-neon"
                    : "text-orange"
                }`}
              >
                {sponsor.tier}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-teal">
          <p className="text-orange mb-4">Want to become a sponsor?</p>
          <Link href={"https://wa.me/+923313416850"}  className="bg-neon hover:bg-[#8FD800] text-dark font-bold py-3 px-8 rounded-lg transition-all border-2 border-transparent hover:border-yellow">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
