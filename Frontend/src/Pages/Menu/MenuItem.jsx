const MenuItem = ({ name, price, image, handleClick }) => {
  const itemPrice = Number.isInteger(Number(price)) ? `${price}.00` : price;

  return (
    <div
      onClick={handleClick}
      className="
        flex flex-col cursor-pointer group bg-white rounded-2xl
        p-3 h-fit sm:p-3.5 md:p-4
        shadow-sm hover:shadow-xl hover:ring-2 hover:ring-purple-400
        transition-all duration-200
        w-full max-w-[220px]
      "
    >
      {/* IMAGE + PRICE */}
      <div className="relative">
        {/* Price badge */}
        <div
          className="
            absolute top-0 right-0 z-10
            bg-purple-500 text-white font-bold
            px-2 py-0.5 rounded-bl-lg rounded-tr-lg
            text-[10px] sm:text-xs md:text-sm
          "
        >
          {itemPrice} ৳
        </div>

        {/* Image */}
        <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* NAME */}
      <span
        className="
          font-bold text-gray-800 text-center truncate
          text-sm sm:text-base md:text-[15px]
          mt-2
        "
      >
        {name}
      </span>
    </div>
  );
};

export default MenuItem;
