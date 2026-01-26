import { useEffect, useState } from "react";
const fields = [
  { label: "পণ্য", name: "product", type: "text" },
  { label: "পরিমাপের একক", name: "unit", type: "text" },
  { label: "বর্তমান মজুদ", name: "currentStock", type: "number" },
  { label: "নূন্যতম মজুদ", name: "minimumStock", type: "number" },
];
export default function UpdateProductModal({
  item,
  mode = "edit", // "add" | "edit"
  onClose,
  onSave,
}) {
  const [formData, setFormData] = useState({
    product: "",
    unit: "",
    currentStock: 0,
    minimumStock: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        product: item.name,
        unit: item.unit,
        currentStock: item.quantity,
        minimumStock: item.minQuantity,
      });
    }

    if (mode === "add") {
      setFormData({
        product: "",
        unit: "",
        currentStock: 0,
        minimumStock: 0,
      });
    }

    setTimeout(() => setIsVisible(true), 10);
  }, [item, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50
      transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-gray-50 w-[420px] rounded-xl p-6 shadow-lg
        transform transition-transform duration-300
        ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        <h2 className="text-center text-orange-500 font-bold text-lg mb-5">
          {mode === "add"
            ? "➕ নতুন পণ্য যোগ করুন"
            : "✏️ পণ্যের তথ্য আপডেট করুন"}
        </h2>

        {fields.map((field) => (
          <div
            key={field.name}
            className="flex justify-between items-center mb-3"
          >
            <label className="font-semibold">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-44 px-3 py-1.5 border rounded-md"
            />
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-5 py-2 rounded-full"
          >
            ✖ বাতিল করুন
          </button>

          <button
            onClick={() => {
              onSave(formData);
              handleClose();
            }}
            className="bg-green-500 text-white px-5 py-2 rounded-full"
          >
            {mode === "add" ? "➕ যোগ করুন" : "✔ সংরক্ষণ করুন"}
          </button>
        </div>
      </div>
    </div>
  );
}
