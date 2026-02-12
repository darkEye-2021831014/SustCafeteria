const MenuItem = ({ name, price, image, className = "", handleClick }) => {
  const itemPrice = Number.isInteger(price) ? `${price}.00` : price;
  return (
    <div
      className={`flex rounded-lg bg-white px-5 py-2.5 w-fit h-fit flex-col gap-1.25 leading-none shadow-md ${className} cursor-pointer 
      hover:outline-2 hover:outline-cyan-500 hover:-outline-offset-2 hover:transition-outline hover:duration-100 hover:shadow-2xl`}
      onClick={handleClick}
    >
      <div className="flex flex-col w-full h-fit items-end">
        <div className="flex rounded-sm p-0.5 gap-px w-fit h-fit bg-[#C057E2]/92 border border-white/35 justify-center items-center leading-none text-white ">
          <span className="font-bold">{itemPrice}</span>
          <span className="text-[18px]">৳</span>
        </div>
        <img
          src={image}
          alt=""
          className="w-25 h-17.5 rounded-md object-cover"
        />
      </div>
      <span className="font-bold">{name}</span>
    </div>
  );
};

export default MenuItem;
