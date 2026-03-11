import React from "react";
import sustLogo from "../../assets/sustLogo.png";
import TextIconButton from "../../components/Button/TextIconButton";
import { IoClose } from "react-icons/io5";
import { HiPrinter } from "react-icons/hi2";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";

const OrderInfo = () => {
  return (
    <div className="space-y-1 text-[15px]">
      <p>
        <span className="font-semibold">Cashier:</span> Manager
      </p>
      <p>
        <span className="font-semibold">Order No:</span> O202500001
      </p>
      <p>17/12/2025 &nbsp;&nbsp; 8:10 PM</p>
    </div>
  );
};

const HeaderRight = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Replace with real logo if needed */}
      <img src={sustLogo} alt="SUST Logo" className="w-auto h-12" />
      <h2 className="text-2xl tracking-wide font-tourney">Sust Cafeteria</h2>
    </div>
  );
};

const ReceiptTable = () => {
  const { orderItemList } = useOrderContext();
  const items = orderItemList.map((item) => ({
    name: item.name,
    qty: item.qty,
    price: item.price,
  }));

  const total = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  const rowBorder = "border-b-2 border-black/30 text-center";
  const cellBorder = "border-r-2 border-black/30 py-2";

  return (
    <div className="mt-6">
      <table className="w-full border-2 border-black/30 text-md">
        <thead>
          <tr className={rowBorder}>
            <th className={cellBorder}>Name</th>
            <th className={cellBorder}>Quantity</th>
            <th className={cellBorder}>Price</th>
            <th className="py-2">ItemCost</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className={rowBorder}>
              <td className={cellBorder}>{item.name}</td>
              <td className={cellBorder}>{item.qty}</td>
              <td className={cellBorder}>{item.price.toFixed(2)}</td>
              <td className="text-center">
                {(item.qty * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
          {/* Total Row */}
          <tr className="font-bold text-center">
            <td className={cellBorder} colSpan="3">
              Total
            </td>
            <td className="text-center">{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const PaymentInfo = () => {
  const { totalCost } = useOrderContext();
  const cashReceived = 200.0;
  const change = cashReceived - totalCost;

  return (
    <div className="mt-6 space-y-4">
      <table className="border-2 border-black/30 text-lg w-full text-center font-bold">
        <tbody>
          <tr className="border-b-2 border-black/30">
            <td className="border-r-2 border-black/30 py-2 ">
              Cash Received (BDT)
            </td>
            <td>{cashReceived.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border-r-2 border-black/30 py-2">Change</td>
            <td>{change.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const ActionButtons = ({ onCancel, onConfirm }) => {
  const handelCancelClick = () => {
    onCancel();
  };
  const handleConfirmClick = () => {
    onConfirm();
  };
  return (
    <div className="mt-8 flex justify-center gap-48">
      <TextIconButton
        className="bg-red-700 rounded-full shadow hover:bg-red-500"
        text="Cancel Order"
        icon={<IoClose className="text-[24px]" />}
        onClick={handelCancelClick}
      />
      <TextIconButton
        className="bg-blue-700 rounded-full shadow hover:bg-blue-500"
        text="Print Receipt"
        icon={<HiPrinter className="text-[24px]" />}
        onClick={handleConfirmClick}
      />
    </div>
  );
};

const OrderReceiptModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="bg-gray-200 w-175 rounded-2xl p-10 shadow-xl">
      {/* Title */}
      <h1 className="text-center text-xl text-orange-600 font-tourney font-semibold mb-6">
        Order Receipt
      </h1>

      {/* Top Section */}
      <div className="flex justify-between items-start">
        <OrderInfo />
        <HeaderRight />
      </div>

      {/* Table */}
      <ReceiptTable />

      {/* Payment Info */}
      <PaymentInfo />

      {/* Buttons */}
      <ActionButtons onCancel={onCancel} onConfirm={onConfirm} />
    </div>
  );
};

export default OrderReceiptModal;
