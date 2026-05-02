const SubNavBar = ({
  categories = ["All", "Breakfast", "Lunch", "Miscellaneous"],
  activeCategory = "All",
  onCategoryChange,
  activeMode = null,
  onModeChange,
}) => {
  return (
    <div
      className=" bg-[#650b13]/5 border-b border-b-[#8B3A3A]/20 h-14 w-full flex items-center justify-between px-7.5 py-2.5 "
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Left: Category tabs ── */}
      <div className="flex items-center gap-10">
        {categories.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange?.(cat)}
              className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                isActive
                  ? "border border-[#8B3A3A]/60 bg-[#ffb8c0]"
                  : "bg-none hover:bg-[#650b13]/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Right: Action buttons ── */}
      <div className="flex items-center gap-10">
        {[
          { label: "Edit Items", value: "edit" },
          { label: "Delete Items", value: "delete" },
        ].map(({ label, value }) => {
          const isActive = activeMode === value;
          return (
            <button
              key={value}
              onClick={() => onModeChange?.(value)}
              className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? "border border-[#8B3A3A]/60 bg-[#ffb8c0]"
                  : "bg-none hover:bg-[#650b13]/10"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SubNavBar;
