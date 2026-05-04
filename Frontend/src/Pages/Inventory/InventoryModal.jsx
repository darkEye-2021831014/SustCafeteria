import React, { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext/InventoryContext";
import Form from "../../components/Form/Form";
import DeleteAll from "../../components/Modal/DeleteAll";
import { getInventoryFields } from "./InventoryHelper";
const AddInventoryModal = ({
  onClose,
  selectedProduct,
  title,
  submitText = "Confirm",
  cancelText = "Cancel",
  submitIcon,
  cancelIcon,
  submitColor,
  cancelColor,
  isRemoveAll,
  className,
}) => {
  const {
    isAdmin,
    activeTab,
    createItem,
    deleteItem,
    updateQuantity,
    updateUsage,
  } = useContext(InventoryContext);

  const fields = getInventoryFields(selectedProduct, isAdmin, activeTab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data:", data);
    try {
      if (!selectedProduct && isAdmin) {
        await createItem({
          ...data,
          minimum_stock: Number(data.minimumStock),
          current_stock: Number(data.currentStock),
        });
      } else if (
        selectedProduct &&
        isAdmin &&
        location.pathname.includes("remove-item")
      ) {
        await deleteItem(selectedProduct.id);
      } else if (
        selectedProduct &&
        !isAdmin &&
        location.pathname.includes("stock-usage")
      ) {
        await updateUsage({
          stock_item_id: selectedProduct.id,
          quantity_used: Number(data.usedStock),
          usage_type: data.usageType,
          note: data.usageDescription,
        });
      } else if (selectedProduct && !isAdmin) {
        await updateQuantity(selectedProduct.id, Number(data.currentStock));
      }
      onClose();
    } catch (err) {
      console.error(err);
      alert(err?.message || "Action failed");
    }
  };

  const handleDeleteAll = async () => {
    alert("Delete all এখনও backend এ করা হয়নি। এই ফিচারটি implement করতে হবে।");
    onClose();
  };

  return (
    <div className=" text-center">
      {isRemoveAll ? (
        <DeleteAll
          title="Are You Sure You Want To Remove Everything ?"
          warning="ALL ITEMS IN THE INVENTORYWILL BE REMOVED AFTER PERFORMING THIS ACTION!!!!"
          onClose={onClose}
          onConfirm={handleDeleteAll}
        ></DeleteAll>
      ) : (
        <Form
          title={title}
          fields={fields}
          submitText={submitText}
          cancelText={cancelText}
          submitIcon={submitIcon}
          cancelIcon={cancelIcon}
          submitColor={submitColor}
          cancelColor={cancelColor}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default AddInventoryModal;
