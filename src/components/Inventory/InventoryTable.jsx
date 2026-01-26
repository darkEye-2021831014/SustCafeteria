import { useContext, useState } from "react";
import { InventoryContext } from "../../Context/InventoryContext/InventoryProvider";
import InventoryTableRow from "./InventoryTableRow";
import UpdateProductModal from "../../Pages/Inventory/UpdateProductModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

const InventoryTable = () => {
  const { filteredItems, loading, updateItem, isAdmin, filter } =
    useContext(InventoryContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalMode, setModalMode] = useState(null);
  console.log("InventoryTable rendered with items:", selectedItem);
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <table className="w-full border border-gray-300  table-fixed">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-3">পণ্যের নাম</th>
            <th className="border border-gray-300 px-4 py-3">পরিমাপের একক</th>
            {!isAdmin && (
              <th className="border border-gray-300 px-4 py-3">বর্তমান মজুদ</th>
            )}
            <th className="border border-gray-300 px-4 py-3">ন্যূনতম মজুদ</th>
            {!isAdmin && (
              <th className="border border-gray-300 px-4 py-3">স্ট্যাটাস</th>
            )}
            {!isAdmin && (
              <th className="border border-gray-300 px-4 py-3">অ্যাকশন </th>
            )}
            {filter === "Remove Item" && (
              <th className="border border-gray-300 px-4 py-3">অ্যাকশন </th>
            )}
          </tr>
        </thead>

        <tbody>
          {filteredItems.map((item, index) => (
            <InventoryTableRow
              key={item.id}
              item={item}
              onClick={() => {
                setSelectedItem(item);
                setModalMode("edit");
              }}
            ></InventoryTableRow>
          ))}
        </tbody>
      </table>
      {/* {selectedItem && (
        <UpdateProductModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={(updatedData) => {
            const itemId = selectedItem.id;
            updateItem(itemId, updatedData);
            console.log("Updated item:", updatedData);
            setSelectedItem(null);
          }}
        />
      )} */}

      {isAdmin &&
        (filter === "Add Item" ? (
          <div
            className="flex justify-end cursor-pointer "
            onClick={() => {
              setSelectedItem(null);
              setModalMode("add");
            }}
          >
            <div className="flex gap-2 justify-center items-center bg-green-400 px-10 py-4 rounded-4xl mt-5 text-white">
              <IoMdAddCircleOutline className="text-[30px]" />
              <h1 className="font-bold text-[30px]">Add Item</h1>
            </div>
          </div>
        ) : (
          <div className="flex justify-end cursor-pointer">
            <div className="flex gap-2 justify-center items-center bg-red-600 px-10 py-4 rounded-4xl mt-5 text-white">
              <RiDeleteBin6Line className="text-[30px]" />
              <h1 className="font-bold text-[30px]">Remove All</h1>
            </div>
          </div>
        ))}


        {modalMode && (
  <UpdateProductModal
    mode={modalMode}
    item={modalMode === "edit" ? selectedItem : null}
    onClose={() => {
      setModalMode(null);
      setSelectedItem(null);
    }}
    onSave={(data) => {
      if (modalMode === "edit") {
        updateItem(selectedItem.id, data);
      } else {
        // addItem(data); 
        console.log("Adding new item:", data);
      }
    }}
  />
)}

    </>
  );
};

export default InventoryTable;
