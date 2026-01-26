import React from 'react';
import InventoryAlert from './InventoryAlert';
import InventoryTable from '../../components/Inventory/InventoryTable';
import InventoryHeader from './InventoryHeader';
const Inventory = () => {
    return (
        <div >
            <InventoryAlert></InventoryAlert>
            <div className="mt-8 bg-[#E8B5BA]/20 p-10 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.25)] mx-20">
                <InventoryHeader></InventoryHeader>
                <InventoryTable></InventoryTable>
            </div>
            
        </div>

    );
};

export default Inventory;