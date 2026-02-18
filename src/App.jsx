import NavBar from "./components/Header/NavBar";
import SubNavBar from "./components/SubHeader/SubNavBar";
import Menu from "./Pages/MenuPage/Menu";
import OrderReceipt from "./Pages/MenuPage/OrderReceipt";
import Table from "./components/Table/Card";
import Supplier from "./Pages/Supplier/Supplier";
import Supplierprovider from "./contexts/SupplierContext/SupplierContext";
import Inventory from "./Pages/Inventory/Inventory";
import Staff from "./Pages/Staff/Staff";
function App() {

  return (
    <>
      {/* <NavBar active="Supplier" />
      <Supplierprovider>
      <Supplier />  
      </Supplierprovider> */}
      {/* <Inventory/> */}
      <Staff/>
      
    </>
  );
}

export default App;
