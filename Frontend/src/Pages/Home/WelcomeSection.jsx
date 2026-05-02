import { useEffect, useState } from "react";
import { Clock, Calendar } from "lucide-react";

export function WelcomeSection() {
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setCurrentDateTime({ date: dateStr, time: timeStr });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#ffff]/10 border-b border-[#8B3A3A]/20">
      <div className=" px-5 py-7">
        <h1 className="text-4xl font-bold mb-2 font-cormorant">Welcome to SUST Cafeteria</h1>
        <h2>
          Welcome to SUST Cafeteria Management System. Manage your cafeteria
          operations efficiently with our comprehensive management platform
        </h2>

        {currentDateTime && (
          <div className="mt-4 flex gap-12">
            <div className="flex items-center gap-4">
              <Calendar />
              <div className="flex flex-col justify-center">
                <p>Date</p>
                <span className="font-bold">{currentDateTime.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock />
              <div className="flex flex-col justify-center">
                <p>Time</p>
                <span className="font-bold">{currentDateTime.time}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
