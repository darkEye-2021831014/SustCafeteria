import React, { useContext, useState } from "react";
import SubNavBar from "../../components/SubHeader/SubNavBar";
import { StaffContext } from "../../contexts/StaffContext/StaffContext";
import { resolveColumns } from "../../components/Table/table.config";
import TableHeader from "../../components/Table/TableHeader";
import Table from "../../components/Table/Table";
import TextIconButton from "../../components/Button/TextIconButton";
import { GoPlusCircle } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import StaffModalManager from "./StaffModalManager";

const StaffContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const { pillList, activeTab, onTabClick, StaffsData } =
    useContext(StaffContext);
  const getExcludeColumns = (activeTab) => {
    if (activeTab === "Register Staff") return ["action"];
    return [];
  };
  const columns = resolveColumns("STAFF", {
    exclude: getExcludeColumns(activeTab),
  });
  const isRemoveAll = activeTab === "Release Staff" && !selectedStaff;
  console.log(isRemoveAll)
  let submitText, submitColor, submitIcon, cancelColor;

  if (activeTab === "Register Staff") {
    submitText = "Register";
  } else {
    submitText = "Release";
    submitColor = "bg-red-500";
    submitIcon = <RiDeleteBin6Line />;
    cancelColor = "bg-green-500";
  }

  return (
    <div>
      <SubNavBar
        pillList={pillList}
        active={activeTab}
        onTabClick={onTabClick}
      ></SubNavBar>
      <div className={`max-h-[90vh] overflow-y-auto px-15 py-5`}>
        <div className="mt-15 p-20 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)]">
          <TableHeader title="Total Staff List" activeTab></TableHeader>
          <Table
            items={StaffsData}
            columns={columns}
            tHeaders={columns.map((c) => c.label)}
            columnOverrides={{
              action: {
                color: "text-red-500",
                icon: <RiDeleteBin6Line className="text-xl" />,
                onClick: (row) => {
                  setSelectedStaff(row);
                  setIsModalOpen(true);
                },
              },
            }}
          ></Table>
          <div className="flex justify-end mt-5">
            <TextIconButton
              {...(activeTab === "Register Staff"
                ? {
                    text: "Register Staff",
                    icon: <GoPlusCircle />,
                    className:
                      "px-6 py-4 bg-[#34C759] text-white rounded-full font-bold text-xl",
                    onClick: () => setIsModalOpen(true),
                  }
                : {
                    text: "Remove All Staffs",
                    icon: <RiDeleteBin6Line />,
                    className:
                      "px-6 py-4 bg-[#DB2D30] text-white rounded-full font-bold text-xl",
                    onClick: () => {
                      setSelectedStaff(null);
                      setIsModalOpen(true);
                    },
                  })}
            />
          </div>
          <StaffModalManager
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            activeTab={activeTab}
            selectedStaff={selectedStaff}
            isRemoveAll={isRemoveAll}
            submitText={submitText}
            submitColor={submitColor}
            submitIcon={submitIcon}
            cancelColor={cancelColor}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffContent;
