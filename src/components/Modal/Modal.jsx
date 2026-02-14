import React, { useState, useEffect } from "react";

const ModalWrapper = ({ isOpen, onClose, children,className }) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowModal(true), 10);
    } else {
      const timer = setTimeout(() => setShowModal(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`
        relative z-10 mx-25 rounded-3xl shadow-2xl
        transform transition-all duration-500 ease-in-out
        ${className || ""}
        ${isOpen ? "translate-y-0 opacity-100" : "translate-y-40 opacity-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
