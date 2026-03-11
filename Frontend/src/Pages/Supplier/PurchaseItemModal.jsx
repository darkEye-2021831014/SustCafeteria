import React, { useContext } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import Card from "../../components/Table/Card";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import TextIconButton from "../../components/Button/TextIconButton";
import { FaCheck, FaXmark } from "react-icons/fa6";
import FooterRow from "./FooterRow";
const PurchaseItemModal = ({ onClose }) => {
  const {pendingOrdersData} = useContext(SupplierContext);
  const tableConfig = {
    PENDING: {
      title: "Pending Orders List",
      columns: [
        { key: "product", label: "পণ্যের নাম" },
        { key: "cost", label: "খরচ (টাকা)" },
        { key: "currentStock", label: "বর্তমান মজুদ" },
        { key: "orderQty", label: "অর্ডার পরিমাণ" },
        { key: "totalStock", label: "মোট মজুদ" },
        { key: "supplier", label: "সরবরাহকারী" },
        { key: "action", label: "কার্যক্রম" },
      ],
    },
  };
return (
    <div className="p-10">
      <TableHeader title="Order Items" />
      <Table
        items={pendingOrdersData}
        columns={tableConfig.PENDING.columns}
        tHeaders={tableConfig.PENDING.columns.map(c => c.label)}
        footerRow={
            
              <FooterRow activeType="PENDING" tableData={pendingOrdersData} />
            
          }
        viewType="ITEM_MODAL"
      />
      <div className="flex justify-center gap-50 mt-8 px-20 ">
        <TextIconButton
          text="Cancel Order"
          icon={<FaXmark />}
          className="px-6 py-4 bg-[#CB4244] text-white rounded-full font-bold text-xl"
          onClick={onClose}
        />

        <TextIconButton
          text="Confirm Order"
          icon={<FaCheck />}
          className="px-6 py-4 bg-[#34C759] text-white rounded-full font-bold text-xl"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default PurchaseItemModal;
