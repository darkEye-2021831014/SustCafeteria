import React, { useContext, useState } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import Card from "../../components/Table/Card";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import TextIconButton from "../../components/Button/TextIconButton";
import PurchaseItemModal from "./PurchaseItemModal";
import Modal from "../../components/Modal/Modal";
import FooterRow from "./FooterRow";
const Supplier = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const {
    activeType,
    setActiveType,
    suppliersData,
    pendingOrdersData,
    criticalStockData,
  } = useContext(SupplierContext);

  const summary = [
    { title: "Total Supplier", value: suppliersData.length, type: "SUPPLIER" },
    {
      title: "Pending Orders",
      value: pendingOrdersData.length,
      type: "PENDING",
    },
    {
      title: "Critical Stock",
      value: criticalStockData.length,
      type: "CRITICAL",
    },
  ];
  const tableConfig = {
    SUPPLIER: {
      title: "Total Supplier List",
      columns: [
        { key: "name", label: "Name" },
        { key: "item", label: "Item" },
        { key: "price", label: "Price (Per Unit)" },
        { key: "maxDue", label: "Max Due Time" },
      ],
    },

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

    CRITICAL: {
      title: "Low Stock Items (Order Now)",
      columns: [
        { key: "product", label: "পণ্যের নাম" },
        { key: "unit", label: "একক" },
        { key: "currentStock", label: "বর্তমান মজুদ" },
        { key: "minimumStock", label: "সর্বনিম্ন মজুদ" },
        { key: "orderQty", label: "অর্ডার পরিমাণ" },
        { key: "supplier", label: "সরবরাহকারী" },
        { key: "action", label: "কার্যক্রম" },
      ],
    },
  };
  const getTableData = () => {
    if (activeType === "SUPPLIER") return suppliersData;
    if (activeType === "PENDING") return pendingOrdersData;
    if (activeType === "CRITICAL") return criticalStockData;
  };
  const getTableColumns = () => {
    return tableConfig[activeType].columns;
  };
  const getTableTitle = () => {
    return tableConfig[activeType].title;
  };

  return (
    <div className="px-15 py-5 max-h-[90vh] overflow-y-auto">
      <div className="grid grid-cols-3 gap-40 mb-8 mt-8">
        {summary.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            value={item.value}
            active={activeType === item.type}
            onClick={() => setActiveType(item.type)}
          />
        ))}
      </div>
      <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
        <TableHeader title={getTableTitle()} type={activeType} />
        <Table
          items={getTableData()}
          columns={getTableColumns()}
          tHeaders={getTableColumns().map((c) => c.label)}
          statusStyle={{
            None: "text-green-500",
            hour: "text-yellow-500",
            day: "text-red-500",
          }}
          footerRow={
            activeType === "PENDING" && (
              <FooterRow activeType={activeType} tableData={getTableData()} />
            )
          }
          viewType={activeType}
        />
        {activeType === "CRITICAL" && (
          <div className="flex justify-end mt-5">
            <TextIconButton
              text="Create Purchase Order"
              className="px-6 py-4 bg-[#F54758]/70 text-black rounded-full font-bold text-xl"
              onClick={() => setIsPurchaseModalOpen(true)}
            />
          </div>
        )}
        
        <Modal
          isOpen={isPurchaseModalOpen}
          onClose={() => setIsPurchaseModalOpen(false)}
        >
          <PurchaseItemModal onClose={() => setIsPurchaseModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default Supplier;
