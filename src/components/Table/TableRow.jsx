const TableRow = ({ item, columns, statusStyle, viewType, columnOverrides }) => {
  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      {columns.map((col, index) => {
        const override = columnOverrides?.[col.key];
        if (col.render) {
          return (
            <td key={index} className="border border-gray-400 px-4 py-3">
              {col.render(item, viewType, override)}
            </td>
          );
        }

        // const cellClass = col.dynamicClass ? col.dynamicClass(item) : "";
        const cellClass =
          col.dynamicClass
            ? col.dynamicClass(item)
            : col.className || "";

        return (
          <td key={index} className={`border border-gray-400 px-4 py-3 ${cellClass}`}>
            {item[col.key]}
          </td>
        );
      })}
    </tr>
  );
};
export default TableRow;
