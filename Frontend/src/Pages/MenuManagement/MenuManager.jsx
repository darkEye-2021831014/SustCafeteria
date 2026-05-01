// MenuManager.jsx
import { useState } from "react";
import MenuItemList from "./EditMenuItemList";
import AddItemSidebar from "./AddItem";
import ManagementSubNavBar from "./SubNavBar";

const CATEGORIES = ["Breakfast", "Lunch", "Miscellaneous"];

const SAMPLE_ITEMS = [
  {
    id: 1,
    name: "ডিম খিচুড়ি",
    price: "৩৫",
    category: "Breakfast",
    imageUrl: null,
  },
  { id: 2, name: "পরটা", price: "১০", category: "Breakfast", imageUrl: null },
  { id: 3, name: "ডাল ভাজি", price: "২০", category: "Lunch", imageUrl: null },
  { id: 4, name: "মসুর ডাল", price: "৫", category: "Lunch", imageUrl: null },
  { id: 5, name: "চানা ডাল", price: "৫", category: "Lunch", imageUrl: null },
  { id: 6, name: "সাদা ভাত", price: "২০", category: "Lunch", imageUrl: null },
  {
    id: 7,
    name: "মুরগির মাংস",
    price: "৪৫",
    category: "Lunch",
    imageUrl: null,
  },
  { id: 8, name: "রুই মাছ", price: "৭০", category: "Lunch", imageUrl: null },
  { id: 9, name: "পাবদা মাছ", price: "৭০", category: "Lunch", imageUrl: null },
  {
    id: 10,
    name: "চিংড়ি মাছ",
    price: "৭০",
    category: "Dinner",
    imageUrl: null,
  },
  { id: 11, name: "সবজি", price: "২০", category: "Lunch", imageUrl: null },
  { id: 12, name: "বাটা মাছ", price: "১০০", category: "Lunch", imageUrl: null },
  { id: 13, name: "ছোট মাছ", price: "৪৫", category: "Lunch", imageUrl: null },
  { id: 14, name: "আখনী", price: "৬০", category: "Lunch", imageUrl: null },
  {
    id: 15,
    name: "ডিম পুলাও",
    price: "৭০",
    category: "Dinner",
    imageUrl: null,
  },
  {
    id: 16,
    name: "বোয়াল মাছ",
    price: "১০০",
    category: "Dinner",
    imageUrl: null,
  },
  {
    id: 17,
    name: "রুপ চাঁদা",
    price: "১১০",
    category: "Dinner",
    imageUrl: null,
  },
  { id: 18, name: "লাল শাক", price: "১০", category: "Lunch", imageUrl: null },
  { id: 19, name: "মাছের ডিম", price: "৪০", category: "Lunch", imageUrl: null },
  { id: 20, name: "মুড়িঘন্ট", price: "৪০", category: "Lunch", imageUrl: null },
  { id: 21, name: "দুধ চা", price: "১০", category: "Drinks", imageUrl: null },
  { id: 22, name: "রং চা", price: "৫", category: "Drinks", imageUrl: null },
  { id: 23, name: "কফি", price: "২০", category: "Drinks", imageUrl: null },
  {
    id: 24,
    name: "ডিম পোস",
    price: "১৫",
    category: "Breakfast",
    imageUrl: null,
  },
];

const MenuManager = () => {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMode, setActiveMode] = useState("edit"); // ← "edit" selected by default

  const navCategories = ["All", ...CATEGORIES];

  // ── API: Save edited item ──────────────────────────────────────────────────
  const handleSaveItem = async (updatedItem) => {
    // const fd = new FormData();
    // fd.append("name",     updatedItem.name);
    // fd.append("price",    updatedItem.price);
    // fd.append("category", updatedItem.category);
    // if (updatedItem.imageFile) fd.append("image", updatedItem.imageFile);
    // const res = await fetch(`/api/menu-items/${updatedItem.id}`, { method: "PUT", body: fd });
    // if (!res.ok) throw new Error("Failed to save item.");

    setItems((prev) =>
      prev.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
    );
  };

  // ── API: Delete item — must throw on failure ───────────────────────────────
  const handleDeleteItem = async (item) => {
    // const res = await fetch(`/api/menu-items/${item.id}`, { method: "DELETE" });
    // if (!res.ok) throw new Error("Failed to delete item.");

    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // ── API: Add new item ──────────────────────────────────────────────────────
  const handleAddItem = async (newItem) => {
    // const fd = new FormData();
    // ...
    // const res = await fetch("/api/menu-items", { method: "POST", body: fd });
    // if (!res.ok) throw new Error("Failed to add item.");
    // const created = await res.json();
    // setItems((prev) => [...prev, created]);

    setItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
  };

  return (
    <div>
      {/* ── SubNavBar lives here, owns category + mode state ── */}
      <ManagementSubNavBar
        categories={navCategories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />

      <div className="flex justify-between gap-5 bg-[#E8B5BA]/20">
        <MenuItemList
          className="flex-[6]"
          items={items}
          categories={CATEGORIES}
          activeCategory={activeCategory}
          activeMode={activeMode}
          onSaveItem={handleSaveItem}
          onDeleteItem={handleDeleteItem}
        />
        <AddItemSidebar
          className="flex-[2]"
          categories={CATEGORIES}
          onAddItem={handleAddItem}
        />
      </div>
    </div>
  );
};

export default MenuManager;
