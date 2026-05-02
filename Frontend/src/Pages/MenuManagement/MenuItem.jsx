// MenuItem.jsx
// Accepts `mode` prop: "edit" | "delete" | null — changes icon & ring color accordingly.

const EditIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

/**
 * MenuItem
 * @param {object}         item   - { id, name, price, imageUrl, category }
 * @param {Function}       onEdit   - called with item (edit mode)
 * @param {Function}       onDelete - called with item (delete mode)
 * @param {"edit"|"delete"|null} mode
 */
const MenuItem = ({ item, onEdit, onDelete, mode = null }) => {
  const isEdit = mode === "edit";
  const isDelete = mode === "delete";

  const handleCardClick = () => {
    if (isEdit) onEdit?.(item);
    if (isDelete) onDelete?.(item);
  };

  const handleIconClick = (e) => {
    e.stopPropagation();
    if (isEdit) onEdit?.(item);
    if (isDelete) onDelete?.(item);
  };

  const hoverRing = isDelete
    ? "hover:ring-2 hover:ring-red-400"
    : "hover:ring-2 hover:ring-purple-400";

  const iconColor = isDelete
    ? "text-gray-400 hover:text-red-500"
    : "text-gray-400 hover:text-purple-500";

  return (
    <div
      onClick={handleCardClick}
      className={`flex flex-col gap-1.5 cursor-pointer group bg-white rounded-2xl px-[10%] pt-[8%] pb-[5%] ${hoverRing} transition-all duration-200`}
    >
      <div className="relative">
        {/* Price badge */}
        <div className="absolute top-0 right-0 z-10 bg-purple-500 text-white text-[16px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg select-none">
          {item.price} ৳
        </div>

        {/* Image */}
        <div className="w-full aspect-8/6 rounded-xl overflow-hidden border border-gray-100">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
              <svg
                width="32"
                height="32"
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

      {/* Name + action icon */}
      <div className="flex items-center justify-between gap-1 px-0.5 h-fit">
        <span className="text-[100%] font-bold text-gray-800 leading-tight line-clamp-1 h-fit p-1">
          {item.name}
        </span>
        {(isEdit || isDelete) && (
          <button
            onClick={handleIconClick}
            className={`${iconColor} transition-colors shrink-0 p-0.5`}
            title={isDelete ? "Delete item" : "Edit item"}
          >
            {isDelete ? <TrashIcon /> : <EditIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
