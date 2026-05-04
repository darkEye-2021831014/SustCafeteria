export const getHeaders=(reportType) => {
  if (reportType === "Inventory Report") {
    return ["পণ্যের নাম", "পরিমাপের একক ", "বর্তমান মজুদ", "ন্যূনতম মজুদ","মোট ব্যবহার", "ব্যবহারের ধরণ ","প্রস্তুতকারকের নাম"];
    } else if (reportType === "Sales Report") {
    return ["পণ্যের নাম","মোট পরিমান ", "প্রতি উনিটের দাম ","মোট বিক্রয় "];
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
      { key: "product" },
      { key: "total_quantity" },
      { key: "unit_price" },
      { key: "total_sales" },
      
      
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
