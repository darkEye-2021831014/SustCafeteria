const DataCell = ({ value, statusStyle }) => {
  let appliedClass = "";

  if (statusStyle && typeof value === "string") {
    for (const key in statusStyle) {
      if (value.toLowerCase().includes(key.toLowerCase())) {
        appliedClass = statusStyle[key];
        break;
      }
    }
  }

  return (
    <span className={`px-3 py-1 rounded-full ${appliedClass}`}>
      {value ?? "-"}
    </span>
  );
};

export default DataCell;
