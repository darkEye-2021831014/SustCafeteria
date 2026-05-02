// MenuItemList.jsx
// No longer owns category/mode state — receives them from MenuManager as props.

import { useState } from "react";
import MenuItem from "./MenuItem";
import EditPopUp from "./EditPopUp";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

/**
 * MenuItemList
 * @param {object[]}          items           - Menu items from API
 * @param {string[]}          categories      - Raw categories WITHOUT "All"
 * @param {string}            activeCategory  - Controlled by MenuManager
 * @param {"edit"|"delete"|null} activeMode   - Controlled by MenuManager
 * @param {Function}          onSaveItem      - async (updatedItem) => void
 * @param {Function}          onDeleteItem    - async (item) => void — must throw on failure
 * @param {string}            className
 */
const MenuItemList = ({
  items = [],
  categories = [],
  activeCategory = "All",
  activeMode = null,
  onSaveItem,
  onDeleteItem,
  className = "",
}) => {
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  // ── Filter ──
  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  // ── Handlers ──
  const handleEditConfirm = async (updatedItem) => {
    await onSaveItem?.(updatedItem);
    setEditingItem(null);
  };

  const handleDeleteConfirm = async (item) => {
    await onDeleteItem?.(item); // throws → popup stays open with error
    setDeletingItem(null); // success → close
  };

  return (
    <div
      className={`min-h-screen bg-transparent px-6 py-6 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-12">
        {visibleItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            mode={activeMode}
            onEdit={setEditingItem}
            onDelete={setDeletingItem}
          />
        ))}
      </div>

      {/* ── Edit popup ── */}
      <EditPopUp
        item={editingItem}
        categories={categories}
        onConfirm={handleEditConfirm}
        onClose={() => setEditingItem(null)}
      />

      {/* ── Delete confirm popup ── */}
      <DeleteConfirmPopup
        item={deletingItem}
        onConfirm={handleDeleteConfirm}
        onClose={() => setDeletingItem(null)}
      />
    </div>
  );
};

export default MenuItemList;
