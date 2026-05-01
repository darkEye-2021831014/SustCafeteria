export const getHeaders=(reportType) => {
  if (reportType === "Inventory Report") {
    return ["পণ্যের নাম", "পরিমাপের একক ", "বর্তমান মজুদ", "ন্যূনতম মজুদ","মোট ব্যবহার", "ব্যবহারের ধরণ ","প্রস্তুতকারকের নাম"];
    } else if (reportType === "Sales Report") {
    return ["তারিখ", "আইটেমের নাম", "পরিমাণ ব্যবহৃত", "বাকি পরিমাণ"];
    } else if (reportType === "Attendance Report") {
    return ["নাম", "পদবী", "উপস্থিত", "অনুপস্থিত", "দেরি"];
    } else {
    return [];
  }
};
export const getColumns = (reportType) => {
  if (reportType === "Inventory Report") {
    return [    { key: "item_name" },
    { key: "unit" },
    { key: "current_stock" },    
    { key: "minimum_stock" },
    { key: "quantity_used" },
    { key: "usage_type" },
    { key: "created_by" },];
  }
    else if (reportType === "Sales Report") {
    return [
      { key: "date" },
      { key: "item_name" },
        { key: "quantity_used" },
        { key: "remaining_quantity" },
    ];
  } else if (reportType === "Attendance Report") {
    return [
      { key: "name" },
      { key: "position" },
      { key: "present" },
      { key: "absent" },
      { key: "late" },
    ];
  } else {
    return [];
    }
};
