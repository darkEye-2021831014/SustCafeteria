import React from "react";
import MenuItem from "./MenuItem";

const OrderItem = ({ name, price, image, quantity, setQuantity }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setQuantity(Number(value));
    }
  };
  //   console.log(item);
  return (
    <div className="flex ">
      <MenuItem image={image} name={name} price={price} />
      <div>
        <input
          type="text"
          placeholder="1"
          value={quantity}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default OrderItem;
