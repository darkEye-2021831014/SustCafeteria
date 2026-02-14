import { useContext, useState } from "react";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
import Form from "../../components/Form/Form";
import RemoveAllSupplierModal from "./RemoveAllSupplierModal";
import { is } from "date-fns/locale";

const DeleteSupplierModal = ({ onClose, selectedSupplier,isRemoveAll  }) => {
  const { suppliersData, setSuppliersData } = useContext(SupplierContext);
  const [selectedSupplierId, setSelectedSupplierId] = useState(
    selectedSupplier ? selectedSupplier.id : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuppliersData((prev) =>
      prev.filter((supplier) => supplier.id !== Number(selectedSupplierId))
    );
    onClose();
  };

 const fields = [
  {
    label: "Name",
    name: "name",
    defaultValue: selectedSupplier?.name,
    disabled: true,
  },
  {
    label: "Supplied Item",
    name: "item",
    defaultValue: selectedSupplier?.item,
    disabled: true,
  },
  {
    label: "Per Unit Price",
    name: "price",
    type: "number",
    defaultValue: selectedSupplier?.price,
    disabled: true,
  },
];


  return (
    <div className="text-center">
      {isRemoveAll && (
        <RemoveAllSupplierModal onClose={onClose} />
        )}
     {!isRemoveAll && (
        <Form
          title="Delete Supplier"
          fields={fields}
          submitText="Delete"
          cancelText="Cancel"
          onSubmit={handleSubmit}
        onClose={onClose}
      />)}
    </div>
  );
};
export default DeleteSupplierModal;
