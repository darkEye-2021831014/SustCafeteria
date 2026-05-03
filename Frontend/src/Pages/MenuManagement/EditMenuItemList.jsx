import { useState } from "react";
import MenuItem from "./MenuItem";
import EditPopUp from "./EditPopUp";
import DeleteConfirmPopup from "./DeleteConfirmPopup";

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
    await onDeleteItem?.(item);
    setDeletingItem(null);
  };

  return (
    <div
      className={`bg-transparent px-6 py-6 ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Grid ── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-12 gap-y-12">
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
