// DeleteConfirmPopup.jsx
// Modal that previews an item before deletion, with loading + error states.

import { useState } from "react";

const TrashIcon = () => (
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
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const XIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SpinnerIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

/**
 * DeleteConfirmPopup
 * @param {object|null} item         - Item to delete; null = hidden
 * @param {Function}    onConfirm    - async (item) => void  — must throw on failure
 * @param {Function}    onClose      - () => void
 */
const DeleteConfirmPopup = ({ item, onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!item) return null;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      await onConfirm(item);
      // parent handles closing after success
    } catch (err) {
      setError(err?.message || "Delete failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return; // block close during request
    setError(null);
    onClose();
  };

  return (
    /* ── Backdrop ── */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(2px)",
      }}
      onClick={handleClose}
    >
      {/* ── Modal card ── */}
      <div
        className="relative bg-[#F0F0F5] rounded-3xl px-10 py-9 w-[580px] max-w-[95vw] shadow-2xl"
        style={{ fontFamily: "'Inter', sans-serif" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Heading ── */}
        <h2 className="text-[#E8380D] font-bold text-xl leading-snug mb-7">
          Are You Sure You Want To Delete This Item ?
        </h2>

        {/* ── Body: label + card preview ── */}
        <div className="flex items-center justify-between gap-6 mb-8">
          {/* Left label */}
          <p className="text-[#E8600D] font-bold text-lg leading-snug">
            Item Preview
            <br />
            In Menu Tab
          </p>

          {/* Right: read-only MenuItem card (same styles as MenuItem) */}
          <div className="w-42.5 flex flex-col gap-1.5 bg-white rounded-2xl px-[4%] pt-[3%] pb-[2%] shadow-sm shrink-0">
            <div className="relative">
              {/* Price badge */}
              <div className="absolute top-0 right-0 z-10 bg-purple-500 text-white text-[13px] font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg select-none">
                {item.price} ৳
              </div>
              {/* Image */}
              <div className="w-full aspect-8/6 rounded-xl overflow-hidden border border-gray-100">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
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
            {/* Name */}
            <div className="px-0.5 pt-1">
              <span className="text-sm font-bold text-gray-800 leading-tight line-clamp-1 block">
                {item.name}
              </span>
            </div>
          </div>
        </div>

        {/* ── Error message ── */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">
            {error}
          </p>
        )}

        {/* ── Actions ── */}
        <div className="flex items-center justify-between">
          {/* Cancel */}
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex items-center gap-2 bg-[#34C759] hover:bg-[#2bb34e] disabled:opacity-50 text-white font-semibold text-base px-7 py-3 rounded-full transition-colors duration-150"
          >
            <XIcon />
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 bg-[#E03030] hover:bg-[#c42a2a] disabled:opacity-60 text-white font-semibold text-base px-7 py-3 rounded-full transition-colors duration-150"
          >
            {loading ? <SpinnerIcon /> : <TrashIcon />}
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
