// Slide-up popup overlay that wraps EditMenu

import { useEffect, useRef } from "react";
import EditMenu from "./EditMenu";

/**
 * EditPopUp
 * @param {object|null} item        - Item being edited; null = closed
 * @param {string[]}    categories  - Category options from parent/API
 * @param {Function}    onConfirm   - Called with updated item data
 * @param {Function}    onClose     - Called to close the popup
 */
const EditPopUp = ({ item, categories = [], onConfirm, onClose }) => {
  const isOpen = !!item;
  const overlayRef = useRef(null);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose?.();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ── Backdrop — fades in/out ── */}
      <div
        ref={overlayRef}
        onClick={handleBackdropClick}
        className="fixed inset-0 z-40 flex items-end justify-center transition-all duration-300"
        style={{
          backgroundColor: isOpen ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* ── Slide-up panel ── */}
        <div
          className="w-full max-w-[480px] bg-gray-50 rounded-t-3xl px-5 pt-5 pb-8 overflow-y-auto transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(100%)",
            maxHeight: "92vh",
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* EditMenu content — only mounted when open to reset state */}
          {isOpen && (
            <EditMenu
              item={item}
              categories={categories}
              onConfirm={onConfirm}
              onCancel={onClose}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EditPopUp;
