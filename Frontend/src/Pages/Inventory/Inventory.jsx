import NavBar from "../../components/Header/NavBar";
import InventoryProvider from "../../contexts/InventoryContext/InventoryContext";
import InventoryContent from "./InventoryContent";
const Inventory = () => {
  return (
    <div>
      {/* <NavBar></NavBar> */}
      <InventoryProvider>
        <InventoryContent />
      </InventoryProvider>
    </div>
  );
};

export default Inventory;
