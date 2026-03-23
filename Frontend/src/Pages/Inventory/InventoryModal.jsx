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
  const { isAdmin, setProductsData, activeTab } = useContext(InventoryContext);
  const [selectedProductName, setSelectedProductName] = React.useState(
    selectedProduct ? selectedProduct.name : "",
  );
  const fields = getInventoryFields(selectedProduct, isAdmin, activeTab);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    if (selectedProduct && isAdmin) {
      setProductsData((prev) =>
        prev.filter((product) => product.name !== selectedProductName),
      );
    } else if (selectedProduct && !isAdmin) {
      setProductsData((prev) =>
        prev.map((product) =>
          product.name === selectedProductName
            ? {
                ...product,
                name: data.name,
                unit: data.unit,
                currentStock: Number(data.currentStock),
                minimumStock: Number(data.minimumStock),
                description: data.description,
              }
            : product,
        ),
      );
    } else {
      setProductsData((prev) => [...prev, data]);
    }
    onClose();
  };
  return (
    <div className=" text-center">
      {isRemoveAll ? (
        <DeleteAll
          title="Are You Sure You Want To Remove Everything ?"
          warning="ALL ITEMS IN THE INVENTORYWILL BE REMOVED AFTER PERFORMING THIS ACTION!!!!"
          onClose={onClose}
          setData={setProductsData}
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
