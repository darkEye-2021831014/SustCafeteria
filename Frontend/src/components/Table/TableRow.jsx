const TableRow = ({
  item,
  columns,
  statusStyle,
  viewType,
  columnOverrides,
}) => {
  return (
    <tr className="border-b text-center hover:bg-[#F54758]/5">
      {columns.map((col, index) => {
        // const override = columnOverrides?.[col.key];
        if (col.render || columnOverrides?.[col.key]) {
          const content = col.render
            ? col.render(item, viewType, columnOverrides?.[col.key])
            : columnOverrides[col.key](item);

          return (
            <td key={index} className="border border-gray-400 px-4 py-3">
              {content}
            </td>
          );
        }

        // const cellClass = col.dynamicClass ? col.dynamicClass(item) : "";
        let cellClass = col.dynamicClass
          ? col.dynamicClass(item)
          : col.className || "";
        if (col.key === "status" && item.status && statusStyle[item.status]) {
          cellClass += ` ${statusStyle[item.status]}`;
        }

        return (
          <td
            key={index}
            className={`border border-gray-400 px-4 py-3 ${cellClass}`}
          >
            {item[col.key]}
          </td>
        );
      })}
    </tr>
  );
};
export default TableRow;
