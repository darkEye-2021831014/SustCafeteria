import React from 'react';
import SupplierContent from './SupplierContent';
import SupplierProvider from '../../contexts/SupplierContext/SupplierContext';

const Supplier = () => {
  return (
    <div>
      <SupplierProvider>
      <SupplierContent/>
      </SupplierProvider> */
    </div>
  );
};

export default Supplier;