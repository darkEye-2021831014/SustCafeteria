import { useState, useEffect, useRef } from "react";
import AddItemConfirmDialog from "./AddItemConfirmDialog";

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

const PreviewCard = ({ item }) => (
  <div className="relative flex flex-col gap-2 w-[130px]">
    <div className="absolute top-0 right-0 z-10 bg-purple-500 text-white text-[16px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg select-none">
      {item.price || "০"}৳
    </div>
    <div className="w-full aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
      {item.imageUrl ? (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
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
    <span className="text-[16px] font-semibold text-gray-800 text-center leading-tight truncate px-0.5">
      {item.name || "Item name"}
    </span>
  </div>
);

const inputCls =
  "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[15px] text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition-all";

const AddItemSidebar = ({
  categories = [],
  onAddItem,
  onCancel,
  className = "",
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  // Sync category once categories arrive from API
  useEffect(() => {
    if (categories.length > 0 && !category) {
      setCategory(categories[0]);
    }
  }, [categories]);

  const handlePriceChange = (e) => {
    const ascii = toAscii(e.target.value).replace(/[^0-9.]/g, "");
    setPrice(ascii ? toBengali(ascii) : "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));

    e.target.value = null;
  };

  const validate = () => {
    if (!name.trim()) return "Please enter the item name.";
    if (!price) return "Please enter a price.";
    if (!category) return "Please select a category.";
    return "";
  };

  const handleAddClick = () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setShowConfirm(true);
  };

  const handleCancelClick = () => {
    setName("");
    setPrice("");
    setImageUrl(null);
    setImageFile(null);
    setError("");
    onCancel?.();
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onAddItem?.({ name, price, category, imageUrl, imageFile });
    // reset
    setName("");
    setPrice("");
    setCategory(categories[0] ?? "");
    setImageUrl(null);
    setImageFile(null);
  };

  // Live preview item shape
  const previewItem = { id: "__preview__", name, price, imageUrl, category };

  return (
    <>
      {showConfirm && (
        <AddItemConfirmDialog
          item={previewItem}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      {/* ── Sidebar panel ── */}
      <div
        className={`flex flex-col w-85 min-h-screen bg-[#650b13]/2 px-5 py-6 overflow-y-auto ${className} border-l border-l-[#8B3A3A]/20 `}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {/* Title */}
        <h2 className="text-center text-[20px] font-bold text-orange-500 mb-5">
          Add New Item
        </h2>

        {/* Action buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={handleCancelClick}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-[14px] px-5 py-2.5 rounded-full transition-all duration-150 hover:cursor-pointer"
          >
            <svg
              width="13"
              height="13"
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
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-[14px] px-5 py-2.5 rounded-full transition-all duration-150 hover:cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Add Item
          </button>
        </div>

        {/* Image upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-video rounded-xl overflow-hidden bg-white border border-gray-200 mb-4 cursor-pointer relative group"
        >
          {imageUrl ? (
            <>
              <img
                src={imageUrl}
                alt="preview"
                className="w-full h-full object-cover"
              />
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

        {/* Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name"
          className={`${inputCls} mb-3`}
        />

        {/* Price */}
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="০.০০"
          className={`${inputCls} mb-3`}
        />

        {/* Category */}
        <div className="relative mb-5">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`${inputCls} appearance-none cursor-pointer`}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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

        {/* Inline error */}
        {error && (
          <p className="text-[13px] font-medium text-red-500 -mt-2 mb-3">
            {error}
          </p>
        )}

        {/* ── Live preview section ── */}
        <div className="flex items-center gap-4 bg-white rounded-2xl px-4 py-4 border border-gray-200">
          <p className="text-[15px] font-bold text-orange-500 leading-snug flex-1">
            Item Preview
            <br />
            In Menu Tab
          </p>
          <PreviewCard item={previewItem} />
        </div>
      </div>
    </>
  );
};

export default AddItemSidebar;
