import React, { useContext } from "react";
import PageHeader from "../../components/Table/PageHeader";
import Form from "../../components/Form/Form";
import { SupplierContext } from "../../contexts/SupplierContext/SupplierContext";
const RegisterSupplierModal = ({onClose}) => {
  const { addSupplier } = useContext(SupplierContext);

  const fields = [
    { label: "Name", name: "name", placeholder: "Golam Mustofa" },
    { label: "Supplied Item", name: "item", placeholder: "Rice" },
    { label: "Per Unit Price", name: "price", type: "number", placeholder: "90" },
  ];

const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  addSupplier(data);   
  onClose();
};

  return (
    <div className=" text-center">
     
      <Form
        title="Register New Supplier"
        fields={fields}
        submitText="Register"
        cancelText="Cancel"
        onSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};

export default RegisterSupplierModal;
