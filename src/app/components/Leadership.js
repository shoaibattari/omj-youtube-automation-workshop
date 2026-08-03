import {
  FaUserTie,
  FaMicrophone,
  FaGraduationCap,
  FaStar,
} from "react-icons/fa";

export default function Leadership() {
  const organizers = [
    {
      name: "Ms. Saba Vayani",
      role: "Lead Trainer",
      type: "trainer",
      desc:
        "AI & YouTube Automation, Social Media Marketing Expert & Motivational Coach",
    },
    {
      name: "Mst. Kulsoom Abdul Sattar Jakhura",
      role: "Chairperson",
      type: "organizer",
      desc: "OMJ Vocational Centre (Female)",
    },
    {
      name: "Shahid Adam Kath",
      role: "Chairman",
      type: "organizer",
      desc: "Social Welfare Committee & Joint Secretary OMJ",
    },
  ];

  return (
    <section className="relative py-28 bg-[#0a0a1a] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-125 bg-[#ff1493]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <p className="text-[#ff1493] font-black uppercase tracking-[0.35em] text-xs mb-4">
            Workshop Leadership
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
            Meet The Team
          </h2>

          <p className="mt-5 text-white/50 max-w-2xl mx-auto">
            Learn from experienced trainers and community leaders guiding this
            workshop.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {organizers.map((leader, index) => (
            <div
              key={index}
              className={`relative rounded-[2rem] border backdrop-blur-xl p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${leader.type === "trainer"
                ? "bg-gradient-to-b from-[#ff1493]/20 to-black border-[#ff1493]/40 shadow-pink-500/20"
                : "bg-white/5 border-white/10"
                }`}
            >
              {leader.type === "trainer" && (
                <div className="absolute top-5 right-5 bg-[#ff1493] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-pink-500/30">
                  <FaStar />
                  Featured Trainer
                </div>
              )}

              <div className="flex justify-center mb-8">
                <div
                  className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl ${leader.type === "trainer"
                    ? "bg-[#ff1493] text-white shadow-lg shadow-pink-500/30"
                    : "bg-slate-800 text-white"
                    }`}
                >
                  {leader.type === "trainer" ? (
                    <FaMicrophone />
                  ) : leader.role.includes("Chairman") || leader.role.includes("Chairperson") ? (
                    <FaUserTie />
                  ) : (
                    <FaGraduationCap />
                  )}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-3xl font-black text-white mb-3">
                  {leader.name}
                </h3>

                <p
                  className={`font-black uppercase tracking-widest text-xs mb-4 ${leader.type === "trainer"
                    ? "text-[#ff69b4]"
                    : "text-[#ff1493]"
                    }`}
                >
                  {leader.role}
                </p>

                <p className="text-white/60 leading-relaxed">{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-white/30 uppercase text-xs tracking-[0.5em] font-bold">
            Empowering The Community Through Digital Skills
          </p>
        </div>
      </div>
    </section>
  );
}