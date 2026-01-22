import { FaUserTie, FaMicrophone, FaGraduationCap } from "react-icons/fa";

export default function Leadership() {
  const organizers = [
    {
      name: "Saba Vayani",
      role: "Trainer / Mentor",
      type: "speaker",
      desc: "YouTube Automation Expert",
    },
    {
      name: "Shahid Adam Kath",
      role: "Chairman",
      type: "organizer",
      desc: "Social Welfare Committee & Joint Secretary OMJ",
    },
    {
      name: "M. Arif Tayyab Suriya",
      role: "Hon. General Secretary",
      type: "organizer",
      desc: "Okhai Memon Jamat",
    },
  ];

  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-100">
      <div className="container mx-auto px-4 text-center">
        {/* Section Heading */}
        <div className="mb-16">
          <p className="text-red-600 font-black tracking-[0.3em] uppercase text-xs mb-3">
            Expertise & Management
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
            Course <span className="text-red-600">Leadership</span>
          </h2>
          <div className="w-20 h-1.5 bg-slate-900 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {organizers.map((leader, index) => (
            <div
              key={index}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group bg-white ${
                leader.type === "speaker"
                  ? "border-red-600 shadow-xl shadow-red-50"
                  : "border-slate-100"
              }`}
            >
              {/* Icon Badge */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 transition-all duration-500 transform group-hover:rotate-6 ${
                  leader.type === "speaker"
                    ? "bg-red-600 text-white shadow-lg shadow-red-200"
                    : "bg-slate-900 text-white shadow-lg shadow-slate-200"
                }`}
              >
                {leader.type === "speaker" ? (
                  <FaMicrophone size={28} />
                ) : leader.role.includes("Chairman") ? (
                  <FaUserTie size={28} />
                ) : (
                  <FaGraduationCap size={28} />
                )}
              </div>

              <h3 className="text-2xl font-black mb-2 tracking-tighter uppercase italic">
                {leader.name}
              </h3>

              <div className="min-h-15 flex flex-col justify-center">
                <p className="text-red-600 font-black text-xs uppercase mb-3 tracking-widest">
                  {leader.role}
                </p>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-tighter leading-relaxed">
                  {leader.desc}
                </p>
              </div>

              {leader.type === "speaker" && (
                <div className="absolute top-6 right-6 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                  Guest Mentor
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Text */}
        <p className="mt-16 text-slate-400 font-bold text-[10px] uppercase tracking-[0.5em]">
          Empowering the community through digital skills
        </p>
      </div>
    </section>
  );
}
