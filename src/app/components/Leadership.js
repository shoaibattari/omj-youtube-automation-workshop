import { FaUserTie, FaMicrophone } from "react-icons/fa";

export default function Leadership() {
  const organizers = [
    {
      name: "Saba Vayani",
      role: "Guest Speaker / Mentor",
      type: "speaker",
      desc: "YouTube Automation Expert",
    },
    {
      name: "Shahid Adam Kath",
      role: "Social Welfare Committee",
      type: "organizer",
      desc: "Lead Organizer",
    },
    {
      name: "M. Arif Tayyab Suriya",
      role: "Social Welfare Committee",
      type: "organizer",
      desc: "Lead Organizer",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-slate-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">
          Event <span className="text-red-600">Leadership</span>
        </h2>
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto">
          Meet the mentors and organizers bringing this digital opportunity to
          the community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {organizers.map((leader, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl group bg-white ${
                leader.type === "speaker"
                  ? "border-red-600 ring-1 ring-red-600"
                  : "border-gray-200"
              }`}
            >
              {/* Icon Badge */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110 ${
                  leader.type === "speaker"
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {leader.type === "speaker" ? (
                  <FaMicrophone size={24} />
                ) : (
                  <FaUserTie size={24} />
                )}
              </div>

              <h3 className="text-2xl font-bold mb-1 tracking-tight">
                {leader.name}
              </h3>
              <p className="text-red-600 font-bold text-sm uppercase mb-3 tracking-widest">
                {leader.role}
              </p>
              <p className="text-slate-400 text-sm italic">{leader.desc}</p>

              {leader.type === "speaker" && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase">
                  Featured
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
