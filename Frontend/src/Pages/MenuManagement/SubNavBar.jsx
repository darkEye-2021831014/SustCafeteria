const SubNavBar = ({
  categories = ["All", "Breakfast", "Lunch", "Miscellaneous"],
  activeCategory = "All",
  onCategoryChange,
  activeMode = null,
  onModeChange,
}) => {
  return (
    <div
      className="w-full flex items-center justify-between px-7.5 py-2.5 border-b border-b-[#34C759] bg-[#E8B5BA]/50"
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
              className={`cursor-pointer px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-700 hover:bg-white/50"
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
                  ? "bg-white text-gray-900 shadow-sm"
                  : "bg-transparent text-gray-700 hover:bg-white/50"
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
