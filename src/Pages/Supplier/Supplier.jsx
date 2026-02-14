import React, { useContext, useState } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import Card from "../../components/Table/Card";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import TextIconButton from "../../components/Button/TextIconButton";
import PurchaseItemModal from "./PurchaseItemModal";
import Modal from "../../components/Modal/Modal";
import FooterRow from "./FooterRow";
import {
  TABLE_CONFIG,
  resolveColumns,
} from "../../components/Table/table.config";
import { RiArrowDropDownLine } from "react-icons/ri";
import ManageSupplier from "./ManageSupplier";
const Supplier = () => {
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const {
    activeType,
    setActiveType,
    suppliersData,
    pendingOrdersData,
    criticalStockData,
    isAdmin,
    summaryCards,
  } = useContext(SupplierContext);
  const dataMap = {
    suppliersData,
    pendingOrdersData,
    criticalStockData,
  };

  const tableData = dataMap[TABLE_CONFIG[activeType]?.dataKey] || [];

  const columns = resolveColumns(activeType, {
    exclude: !isAdmin ? [] : ["maxDue"],
  });

  console.log("Columns", columns);
  const tableTitle = TABLE_CONFIG[activeType]?.title;

  const actionColumnConfig = TABLE_CONFIG[activeType]?.actionColumnConfig || {
    text: "N/A",
    color: "text-gray-500",
  };

  return (
    <div>
      {isAdmin && (<ManageSupplier items={suppliersData} columns={columns}/>)}
      {!isAdmin && (
        <>

    <div className={`max-h-[90vh] overflow-y-auto px-15 py-5`}>
      <div className="grid grid-cols-3 gap-40 mb-8 mt-8">
        {summaryCards.map((item, index) => (
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
        <TableHeader title={tableTitle} type={activeType} />
        <Table
          items={tableData}
          columns={columns}
          tHeaders={columns.map((c) => c.label)}
          footerRow={
            activeType === "PENDING" && (
              <FooterRow activeType={activeType} tableData={tableData} />
            )
          }
          viewType={activeType}
          columnOverrides={{
            action: actionColumnConfig,
            supplier: {
              color: "text-[#FF6347]",
              icon: <RiArrowDropDownLine className="text-6xl" />,
            },
          }}
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
          className="w-full bg-white"
        >
          <PurchaseItemModal onClose={() => setIsPurchaseModalOpen(false)} />
        </Modal>
      </div>
    </div>
     </>
      )}
    </div>
   
  );
};
export default Supplier;
