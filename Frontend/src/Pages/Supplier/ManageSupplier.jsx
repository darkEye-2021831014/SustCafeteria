import React, { useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import TextIconButton from "../../components/Button/TextIconButton";
import { GoPlusCircle } from "react-icons/go";
import RegisterSupplierModal from "./RegisterSupplierModal";
import Modal from "../../components/Modal/Modal";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteSupplierModal from "./DeleteSupplierModal";
const ManageSupplier = ({ items, columns }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Register Suppliers");
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const pillList = ["Register Suppliers", "Release Supplier"];
  const actionColumn = {
    key: "action",
    label: "Action",
    render: (row) => (
      <div
        className="flex items-center justify-center gap-2 text-red-500 font-bold cursor-pointer"
        onClick={() => {
          setSelectedSupplier(row);
          setIsModalOpen(true);
        }}
      >
        <RiDeleteBin6Line className="text-xl" />
        <span>Remove</span>
      </div>
    ),
  };

  const getColumnsByTab = () => {
    if (activeTab === "Register Suppliers") {
      return filteredColumns;
    } else if (activeTab === "Release Supplier") {
      return [...filteredColumns, actionColumn];
    }
  };
  const filteredColumns = columns.filter((column) => column.key !== "maxDue");
  const isRemoveAll = activeTab === "Release Supplier" && !selectedSupplier;

  const modalClass = isRemoveAll
    ? "w-[630px] h-[320px]  py-[35px] bg-[#F2F2F7]"
    : "w-[411px] h-[400px] px-[46px] py-[27px] bg-[#F2F2F7]";

  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={setActiveTab}
      ></SubNavBar>
      <div className="px-15 py-5">
        <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] ">
          <TableHeader title="Total Supplier List" />
          <Table
            items={items}
            columns={getColumnsByTab()}
            tHeaders={getColumnsByTab().map((c) => c.label)}
          />
          <div className="flex justify-end mt-5">
            <TextIconButton
              {...(activeTab === "Register Suppliers"
                ? {
                    text: "Add New Supplier",
                    icon: <GoPlusCircle />,
                    className:
                      "px-6 py-4 bg-[#34C759] text-white rounded-full font-bold text-xl",
                    onClick: () => setIsModalOpen(true),
                  }
                : {
                    text: "Remove All Supplier",
                    icon: <RiDeleteBin6Line />,
                    className:
                      "px-6 py-4 bg-[#DB2D30] text-white rounded-full font-bold text-xl",
                    onClick: () => {
                      setSelectedSupplier(null);
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
            {activeTab === "Register Suppliers" && (
              <RegisterSupplierModal onClose={() => setIsModalOpen(false)} />
            )}
            {activeTab === "Release Supplier" && (
              <DeleteSupplierModal
                onClose={() => setIsModalOpen(false)}
                selectedSupplier={selectedSupplier}
                isRemoveAll={isRemoveAll}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageSupplier;
