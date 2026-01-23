import React from "react";
import backgroundImg from "../../assets/download.jpeg";
import rectangleImg from "../../assets/Rectangle 91.png";

const Home = () => {
  const data = [
    { text: "Today's Sales\nTotal: 37 Items", color: "#34C759" },
    {
      text: "4 Items In Inventory Are\nbelow Minimum Stock Level",
      color: "#FF383C",
    },
    { text: "You Have 4\nPending Orders", color: "#FF8D28" },
    {
      text: "2 Staff Are Late Today\nAnd 3 Staff Are Still Absent",
      color: "#CB30E0",
    },
  ];

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      {/* Background */}
      <img
        src={backgroundImg}
        alt=""
        className="absolute inset-0 w-full h-full overflow-hidden "
      />

      {/* Overlay */}
      <div className="relative z-10 bg-black/40  h-full px-4 flex flex-col">
        {/* Header */}
        <div className="text-center pt-8">
          <img src={rectangleImg} alt="" className="w-full h-2 mb-4" />

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sust Cafeteria
          </h1>

          <img src={rectangleImg} alt="" className="w-full h-2 mb-4" />

          <p className="text-white text-sm md:text-base max-w-2xl mx-auto mb-10">
            Welcome to the SUST Cafeteria Management System. Enjoy a faster,
            smarter, and more organized way to manage your daily meals.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 pb-10 w-full" >
          {data.map((item, index) => (
            <div
              key={index}
              className="
                  bg-white bg-opacity-95
                  rounded-xl
                  p-5
                  text-center
                  shadow-md
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                    
                  flex items-center justify-center
                  min-h-[120px]
                  sm:min-h-[140px]
                  lg:min-h-[180px]

                "
            >
              <p
                className="whitespace-pre-line text-sm md:text-base font-semibold"
                style={{ color: item.color }}
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
