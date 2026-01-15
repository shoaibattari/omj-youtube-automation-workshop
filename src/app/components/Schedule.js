import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { schedule } from "../data/schedule";

export default function Schedule() {
  return (
    <section id="schedule" className="py-16 bg-gray-100 text-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Event Schedule</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {schedule.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                <FaClock className="text-secondary mr-2" />
                <span className="font-bold">{item.time}</span>
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.speaker}</p>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-secondary mr-2" />
                <span>{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}