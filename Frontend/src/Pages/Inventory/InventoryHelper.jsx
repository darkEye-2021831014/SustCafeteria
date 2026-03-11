export const getDisplayedData = (ProductsData, activeTab) => {
  if (activeTab === "Low Stock") {
    return ProductsData.filter(
      (item) => Number(item.currentStock) < Number(item.minimumStock)
    );
  }

  if (activeTab === "Available Stock") {
    return ProductsData.filter(
      (item) => Number(item.currentStock) >= Number(item.minimumStock)
    );
  }

  return ProductsData;
};

export const getExcludeColumns = (isAdmin, activeTab) => {

  if (!isAdmin) return ["description"];

  if (activeTab === "Add Item")
    return ["currentStock", "description", "status", "action"];

  return ["currentStock", "description", "status"];
};

export const getTableTitle = (activeTab) => {

  if (activeTab === "Low Stock") return "Low Stock";

  if (activeTab === "Available Stock") return "Available Stock";

  return "Current Inventory";

};

// ✅ fields generator

export const getInventoryFields = (
  selectedProduct,
  isAdmin,
  activeTab
) => {

  const isRemove =
    isAdmin && activeTab === "Remove Item";

  return [

    {
      label: "পণ্যের নাম",
      name: "name",
      placeholder: "চাল (খিচুড়ি )",
      defaultValue: selectedProduct?.name,
      disabled: isRemove,
    },

    {
      label: "পরিমাপের একক",
      name: "unit",
      placeholder: "কেজি",
      defaultValue: selectedProduct?.unit,
      disabled: isRemove,
    },

    {
      label: "বর্তমান মজুদ",
      name: "currentStock",
      type: "number",
      placeholder: "20",
      defaultValue: selectedProduct?.currentStock,
      disabled: isRemove,
    },

    {
      label: "ন্যূনতম মজুদ",
      name: "minimumStock",
      type: "number",
      placeholder: "90",
      defaultValue: selectedProduct?.minimumStock,
      disabled: isRemove,
    },

    {
      label: "পণ্যের বিবরণ",
      name: "description",
      placeholder: "বিস্তারিত বিবরণ লিখুন",
      defaultValue: selectedProduct?.description,
      disabled: isRemove,
    },

  ];

};

