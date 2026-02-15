import React, { useContext, useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import { InventoryContext } from "../../contexts/InventoryContext/InventoryContext";
import InventoryAlert from "./InventoryAlert";
import Table from "../../components/Table/Table";
import {
  resolveColumns,
  TABLE_CONFIG,
} from "../../components/Table/table.config";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextIconButton from "../../components/Button/TextIconButton";
import { GoPlusCircle } from "react-icons/go";
import Modal from "../../components/Modal/Modal";
import AddInventoryModal from "./InventoryModal";
import DeleteSupplierModal from "../Supplier/DeleteSupplierModal";
import TableHeader from "../../components/Table/TableHeader";

const InventoryContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const actionColumn = {
    key: "action",
    label: "Action",
    render: (row) => (
      <div
        className="flex items-center justify-center gap-2 text-red-500 font-bold cursor-pointer"
        onClick={() => {
          setSelectedProduct(row);
          setIsModalOpen(true);
        }}
      >
        <RiDeleteBin6Line className="text-xl" />
        <span>Remove</span>
      </div>
    ),
  };
  const { pillList, activeTab, onTabClick, ProductsData } =
    useContext(InventoryContext);
  console.log("InventoryContent context:", {
    pillList,
    activeTab,
    ProductsData,
  });
  let excludeColumns = [];

  excludeColumns.push("currentStock", "description", "action");
  const columns = resolveColumns("ITEM", {
    exclude: excludeColumns,
  });
  if (activeTab === "Remove Item") {
    columns.push(actionColumn);
  }
  const isRemoveAll = activeTab === "Remove Item" && !selectedProduct;
  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : "bg-white w-[550px] h-[608px] p-[50px]";
  const tableTitle =
    activeTab === "Low Stock"
      ? "Low Stock"
      : activeTab === "Available Stock"
        ? "Available Stock"
        : "Current Inventory";

  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={onTabClick}
      ></SubNavBar>
      <div className={`max-h-[90vh] overflow-y-auto px-15 py-5`}>
        <InventoryAlert />
        <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
          <TableHeader title={tableTitle} type={activeTab} />
          <Table
            items={ProductsData}
            columns={columns}
            tHeaders={columns.map((c) => c.label)}
            columnOverrides={{
              action: {
                color: "text-red-500",
                icon: <RiDeleteBin6Line className="text-xl" />,
              },
            }}
          />
          <div className="flex justify-end mt-5">
            <TextIconButton
              {...(activeTab === "Add Item"
                ? {
                    text: "Add Item",
                    icon: <GoPlusCircle />,
                    className:
                      "px-6 py-4 bg-[#34C759] text-white rounded-full font-bold text-xl",
                    onClick: () => setIsModalOpen(true),
                  }
                : {
                    text: "Remove All Items",
                    icon: <RiDeleteBin6Line />,
                    className:
                      "px-6 py-4 bg-[#DB2D30] text-white rounded-full font-bold text-xl",
                    onClick: () => {
                      setSelectedProduct(null);
                      setIsModalOpen(true);
                    },
                  })}
            />
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className={modalClass}
          >
            {activeTab === "Add Item" && (
              <AddInventoryModal onClose={() => setIsModalOpen(false)} />
            )}
            {activeTab === "Remove Item" && (
              <AddInventoryModal
                onClose={() => setIsModalOpen(false)}
                selectedProduct={selectedProduct}
                isRemoveAll={isRemoveAll}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;
