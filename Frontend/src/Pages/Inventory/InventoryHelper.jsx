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
export const getInventoryFields = (selectedProduct, isAdmin, activeTab) => {
  const isRemove = isAdmin && activeTab === "Remove Item";
  const commonFields = [
    {
      label: "পণ্যের নাম",
      name: "name",
      placeholder: "আলু",
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
      defaultValue: selectedProduct?.current_stock,
      disabled: isRemove,
    },
  ];

  let extraFields = [];
  if (isAdmin && activeTab === "Add Item") {
    extraFields = [
      {
        label: "ন্যূনতম মজুদ",
        name: "minimumStock",
        type: "number",
        placeholder: "90",
        defaultValue: selectedProduct?.minimum_stock,
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
  }
 else if (!isAdmin && activeTab!=="Stock Usage") {
    extraFields = [
      {
        label: "ন্যূনতম মজুদ",
        name: "minimumStock",
        type: "number",
        placeholder: "90",
        defaultValue: selectedProduct?.minimum_stock,
        disabled: isRemove,
      },
    ];
  }
 else if (!isAdmin && activeTab === "Stock Usage") {
    extraFields = [
      {
        label:"ব্যবহৃত পরিমাণ",
        name:"usedStock",
        type:"number",
        placeholder:"20",
      },
      {
        label:"ব্যবহারের বিবরণ ",
        name:"usageDescription",
        placeholder:"বিস্তারিত বিবরণ লিখুন",
      },
      {
        label:"ব্যবহারের ধরণ (খরচ/বর্জ্য)",
        name:"usageType",
        type:"select",
        options:[
          { value: "cooking", label: "খরচ" },
          { value: "wastage", label: "বর্জ্য" }
        ],
      }

    ]
  }
  return [...commonFields, ...extraFields];
};
