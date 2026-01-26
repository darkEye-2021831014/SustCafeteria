const Pill = ({ name, isActive, onClick }) => {
  return (
    
        
    <div
      onClick={onClick}
      className={`cursor-pointer px-5 py-2 rounded-lg font-semibold transition
        ${
          isActive
            ? "bg-white text-black shadow"
            : "text-gray-700 hover:bg-white/60"
        }
      `}
    >
      {name}
    </div>
  );
};
export default Pill;