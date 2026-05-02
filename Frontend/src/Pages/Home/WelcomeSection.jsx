import { useEffect, useState } from "react";
import { Clock3, CalendarDays, Sparkles } from "lucide-react";

export function WelcomeSection({ isManager, userName }) {
  const [currentDateTime, setCurrentDateTime] = useState({ date: "", time: "" });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentDateTime({
        date: now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[#E8B5BA]/40 bg-gradient-to-r from-[#FFF7ED] via-[#FCE7F3] to-[#EEF2FF]">
      <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-[#F54758]/10 blur-2xl" />
      <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-[#8B3A3A]/10 blur-3xl" />

      <div className="relative px-6 py-4">
        {/* <div className="mb-2 flex items-center gap-2 text-[#8B3A3A]">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold">
            {isManager ? "Manager Dashboard" : "Staff Dashboard"}
          </span>
        </div> */}

        <h1 className="text-3xl font-bold text-[#4A1D23] md:text-4xl font-cormorant">
          Welcome to SUST Cafeteria
        </h1>

        <p className="mt-2 max-w-3xl text-[#6B4A50]">
          Welcome to the SUST Cafeteria Management System Enjoy a faster, smarter, and more organized way to manage your daily meals. Order easily, save time, and make your campus dining experience better than ever.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-[#7A4B52]">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Date</span>
            </div>
            <p className="font-semibold text-[#4A1D23]">{currentDateTime.date}</p>
          </div>

          <div className="rounded-xl border border-white/70 bg-white/70 px-4 py-3 shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-[#7A4B52]">
              <Clock3 className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Time</span>
            </div>
            <p className="font-semibold text-[#4A1D23]">{currentDateTime.time}</p>
          </div>
        </div>
      </div>
    </section>
  );
}