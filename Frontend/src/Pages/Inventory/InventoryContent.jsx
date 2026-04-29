import React, { useContext, useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import { InventoryContext } from "../../contexts/InventoryContext/InventoryContext";
import InventoryAlert from "./InventoryAlert";
import {
  resolveColumns,
  TABLE_CONFIG,
} from "../../components/Table/table.config";
import { RiDeleteBin6Line } from "react-icons/ri";
import TextIconButton from "../../components/Button/TextIconButton";
import { GoPlusCircle } from "react-icons/go";
import TableHeader from "../../components/Table/TableHeader";
import InventoryTable from "./InventoryTable";
import InventoryModalManager from "./InventoryModalManager";
import { getExcludeColumns, getTableTitle } from "./InventoryHelper";
import { useLocation } from "react-router";
import InventoryFoundMessage from "./InventoryFoundMessage";

const InventoryContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isAdmin, pillList, onTabClick, products, loading } =
    useContext(InventoryContext);

  let activeTab = "All Item";

  if (location.pathname.includes("low-stock")) {
    activeTab = "Low Stock";
  } else if (location.pathname.includes("available")) {
    activeTab = "Available Stock";
  }else if(location.pathname.includes("remove-item")){
    activeTab = "Remove Item";
  } else if(location.pathname.includes("add-item")){
    activeTab = "Add Item";
  }

  const displayedData = products;

  const columns = resolveColumns("ITEM", {
    exclude: getExcludeColumns(isAdmin, activeTab),
  });

  const tableTitle = getTableTitle(activeTab);

  const isRemoveAll = activeTab === "Remove Item" && !selectedProduct;

  if (loading) {
    return <div className="p-10 text-xl text-center">Loading inventory...</div>;
  }
  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={onTabClick}
      ></SubNavBar>
      <div className={`max-h-[90vh] overflow-y-auto px-15 py-5`}>
        {!isAdmin && <InventoryAlert />}

        <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
          <InventoryFoundMessage
            products={displayedData}
            loading={loading}
            activeTab={activeTab}
          >
            {displayedData.length > 0 && (
              <>
                <TableHeader title={tableTitle} type={activeTab} />
                <InventoryTable
                  data={displayedData}
                  columns={columns}
                  isAdmin={isAdmin}
                  onActionClick={(row) => {
                    setSelectedProduct(row);
                    setIsModalOpen(true);
                  }}
                />
              </>
            )}
          </InventoryFoundMessage>

          {isAdmin && displayedData.length > 0 && (
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
          )}

          <InventoryModalManager
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isAdmin={isAdmin}
            activeTab={activeTab}
            selectedProduct={selectedProduct}
            isRemoveAll={isRemoveAll}
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryContent;
