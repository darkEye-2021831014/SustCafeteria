import NavBar from "./components/Header/NavBar";
import SubNavBar from "./components/SubHeader/SubNavBar";
import Menu from "./Pages/MenuPage/Menu";
import Supplier from "./Pages/Supplier/Supplier";
import Supplierprovider from "./contexts/SupplierContext/SupplierContext";
function App() {

  return (
    <>
      <NavBar active="Supplier" />
      <Supplierprovider>
      <Supplier />  
      </Supplierprovider>
      
    </>
  );
}

export default App;
