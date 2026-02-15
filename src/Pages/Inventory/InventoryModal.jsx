import React, { useContext } from "react";
import { InventoryContext } from "../../contexts/InventoryContext/InventoryContext";
import Form from "../../components/Form/Form";
import DeleteAll from "../../components/Modal/DeleteAll";

const AddInventoryModal = ({
  onClose,
  selectedProduct,
  title,
  submitText,
  cancelText,
  isRemoveAll,
}) => {
  const { setProductsData } = useContext(InventoryContext);
  const [selectedProductName, setSelectedProductName] = React.useState(
    selectedProduct ? selectedProduct.name : "",
  );

  const fields = [
    { label: "পণ্যের নাম", name: "name", placeholder: "চাল (খিচুড়ি )" },
    { label: "পরিমাপের একক ", name: "unit", placeholder: "কেজি" },
    {
      label: "বর্তমান মজুদ ",
      name: "currentStock",
      type: "number",
      placeholder: "20",
    },
    {
      label: "ন্যূনতম মজুদ",
      name: "minimumStock",
      type: "number",
      placeholder: "90",
    },
    {
      label: "পণ্যের বিবরণ",
      name: "description",
      placeholder: "বিস্তারিত বিবরণ লিখুন",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (selectedProduct) {
      setProductsData((prev) =>
        prev.filter((product) => product.name !== selectedProductName),
      );
    } else {
      setProductsData((prev) => [...prev, data]);
    }
    console.log("New Inventory Item:", data);
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
          title="নতুন পণ্য যোগ করুন "
          fields={fields}
          submitText="Register"
          cancelText="Cancel"
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default AddInventoryModal;
