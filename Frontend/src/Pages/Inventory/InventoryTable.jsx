import React from "react";
import Table from "../../components/Table/Table";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

const InventoryTable = ({
  data,
  columns,
  isAdmin,
  onActionClick,
}) => {

  return (

    <Table
      items={data}
      columns={columns}
      tHeaders={columns.map((c) => c.label)}
      columnOverrides={{
        action: {
          color: isAdmin ? "text-red-500" : "text-orange-500",
          icon: isAdmin
            ? <RiDeleteBin6Line className="text-xl" />
            : <TiEdit className="text-xl" />,
          onClick: onActionClick,
        },
      }}
    />

  );

};

export default InventoryTable;
