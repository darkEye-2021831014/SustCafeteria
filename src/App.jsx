import NavBar from "./components/Header/NavBar"
import SubNavBar from "./components/SubHeader/SubNavBar";
function App() {
  return (
    <>
      <NavBar active="Inventory" />
      <SubNavBar active="Breakfast" />
    </>
  );
}

export default App;
