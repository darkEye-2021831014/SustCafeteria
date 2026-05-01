// Confirmation dialog shown after clicking "Add Item"
// Shows a live preview of the item card as it will appear in the menu grid

import MenuItem from "./MenuItem";

/**
 * AddItemConfirmDialog
 * @param {object}   item       - { name, price, imageUrl, category }
 * @param {Function} onConfirm  - Called when user confirms
 * @param {Function} onCancel   - Called when user cancels
 */
const AddItemConfirmDialog = ({ item, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center px-6"
    style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
  >
    <div className="bg-gray-100 rounded-2xl px-6 pt-6 pb-7 w-full max-w-[420px] shadow-xl">
      {/* Success heading */}
      <h2 className="text-[20px] font-bold text-green-500 mb-6">
        Are You Sure You Want to Add This Item to the Menu?
      </h2>

      {/* Preview row */}
      <div className="flex items-center gap-4 mb-7">
        <p className="text-[17px] font-bold text-orange-500 leading-snug flex-1">
          Item Preview
          <br />
          In Menu Tab
        </p>

        {/* Live card preview — reuses MenuItem in display-only mode */}
        <div className="w-[140px]">
          <MenuItem item={item} onEdit={() => {}} />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between gap-3">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white font-semibold text-[15px] py-3 rounded-full transition-all duration-150 hover:cursor-pointer"
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
          onClick={onConfirm}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold text-[15px] py-3 rounded-full transition-all duration-150 hover:cursor-pointer"
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
    </div>
  </div>
);

export default AddItemConfirmDialog;
