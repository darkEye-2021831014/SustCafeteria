import NavBar from "./components/Header/NavBar"
import SubNavBar from "./components/SubHeader/SubNavBar";
import InventoryProvider from "./Context/InventoryContext/InventoryProvider";
import Inventory from "./Pages/Inventory/Inventory";

import InventoryAlert from "./Pages/Inventory/InventoryAlert";

function App() {
  return (
    <>
      <NavBar active="Inventory" />
      <InventoryProvider>
        <SubNavBar />
        <Inventory></Inventory>
      </InventoryProvider>
      

    </>
  );
}

export default App;
