// Edit form content rendered inside the popup

import { useState, useEffect, useRef } from "react";

/**
 * EditMenu
 * @param {object}   item          - The menu item being edited { id, name, price, imageUrl, category }
 * @param {string[]} categories    - Category list from parent/API e.g. ["Breakfast","Lunch","Dinner"]
 * @param {Function} onConfirm     - Called with updated item data
 * @param {Function} onCancel      - Called when cancel is clicked
 */
const EditMenu = ({ item, categories = [], onConfirm, onCancel }) => {
  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState(item?.price ?? "");
  const [category, setCategory] = useState(item?.category ?? "");
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? null);
  const [imageFile, setImageFile] = useState(null);
  const fileRef = useRef(null);

  // Sync category from item or first available category when either arrives
  useEffect(() => {
    if (item?.category) {
      setCategory(item.category);
    } else if (categories.length > 0 && !category) {
      setCategory(categories[0]);
    }
  }, [item, categories]);

  // Bengali digit conversion
  const toBengali = (val) => {
    const map = {
      0: "০",
      1: "১",
      2: "২",
      3: "৩",
      4: "৪",
      5: "৫",
      6: "৬",
      7: "৭",
      8: "৮",
      9: "৯",
    };
    return String(val).replace(/[0-9]/g, (d) => map[d]);
  };
  const toAscii = (val) =>
    String(val).replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d));

  const handlePriceChange = (e) => {
    // Accept both Bengali and ASCII input, store as Bengali display
    const ascii = toAscii(e.target.value).replace(/[^0-9.]/g, "");
    setPrice(toBengali(ascii));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handleConfirm = () => {
    onConfirm?.({
      ...item,
      name,
      price,
      category,
      imageUrl,
      imageFile, // raw File for multipart upload
    });
  };

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* ── Header ── */}
      <h2 className="text-center text-[20px] font-bold text-orange-500 mb-5">
        Edit Item Details
      </h2>

      {/* ── Action buttons ── */}
      <div className="flex justify-between mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-[14px] px-5 py-2.5 rounded-full transition-all duration-150 hover:cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-[14px] px-5 py-2.5 rounded-full transition-all duration-150 hover:cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Confirm
        </button>
      </div>

      {/* ── Item image (clickable to upload) ── */}
      <div
        onClick={() => fileRef.current?.click()}
        className="w-full aspect-video rounded-xl overflow-hidden bg-gray-100 mb-5 cursor-pointer relative group"
      >
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[13px] font-semibold bg-black/50 px-3 py-1.5 rounded-full">
                Change Photo
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <span className="text-[13px]">Tap to upload image</span>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />

      {/* ── Name input ── */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item name"
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-3 transition-all"
      />

      {/* ── Price input ── */}
      <input
        type="text"
        value={price}
        onChange={handlePriceChange}
        placeholder="০.০০"
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent mb-3 transition-all"
      />

      {/* ── Category dropdown ── */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent appearance-none cursor-pointer transition-all"
        >
          {!category && (
            <option value="" disabled>
              Select category
            </option>
          )}
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
