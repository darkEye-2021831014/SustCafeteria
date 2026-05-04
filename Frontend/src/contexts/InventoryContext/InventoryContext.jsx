import { useContext, createContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/Authcontext";
import { useLocation, useNavigate } from "react-router";
import { ENV } from "../../config/env";
export const InventoryContext = createContext();

const InventoryProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role?.toLowerCase() === "manager";

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [lowStockCount, setLowStockCount] = useState(0);

  const pillList = isAdmin
    ? ["Add Item", "Remove Item"]
    : ["All Item", "Low Stock", "Available Stock", "Stock Usage"];

  const [activeTab, setActiveTab] = useState(pillList[0]);

  // Common Fetch Handler (DRY)
  const fetchData = async (url, setter) => {
    setLoading(true);
    const res = await fetch(url, { credentials: "include" });
    const data = await res.json();
    setter(data);
    setLoading(false);
  };

  // Inventory APIs
  const fetchAllItems = () => {
    fetchData(`${ENV.BASE_URL}/inventory`, setProducts);
  };

  const fetchLowStock = () => {
    fetchData(`${ENV.BASE_URL}/inventory/low-stock`, setProducts);
  };

  const fetchAvailableStock = () => {
    fetchData(`${ENV.BASE_URL}/inventory/available`, setProducts);
  };

  //  Low Stock Count (no loading here)
  const fetchLowStockCount = async () => {
    const res = await fetch(`${ENV.BASE_URL}/inventory/low-stock`, {
      credentials: "include",
    });
    const data = await res.json();
    setLowStockCount(data.length);
  };

  // Create
  const createItem = async (item) => {
    await fetch(`${ENV.BASE_URL}/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
      credentials: "include",
    });

    refreshData();
  };

  // Delete
  const deleteItem = async (id) => {
    await fetch(`${ENV.BASE_URL}/inventory/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    refreshData();
  };

  // Update Quantity
  const updateQuantity = async (id, quantity) => {
    const res = await fetch(`${ENV.BASE_URL}/inventory/${id}/quantity`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Failed to update stock quantity");
    }

    refreshData();
  };

  //Refresh
  const refreshData = () => {
    if (location.pathname.includes("low-stock")) {
      fetchLowStock();
    } else if (location.pathname.includes("available")) {
      fetchAvailableStock();
    } else {
      fetchAllItems();
    }

    fetchLowStockCount();
  };

  // Usage Update
  const updateUsage = async (usageData) => {
    console.log("Updating usage with data:", usageData);
    const res = await fetch(`${ENV.BASE_URL}/usage/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usageData),
      credentials: "include",
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || "Failed to update usage");
    }

    refreshData();
  };

  // Navigation
  const onTabClick = (tab) => {
    if (tab === "Low Stock") {
      navigate("/inventory/low-stock");
    } else if (tab === "Available Stock") {
      navigate("/inventory/available");
    } else if (tab === "Stock Usage") {
      navigate("/inventory/stock-usage");
    } else if (tab === "Remove Item") {
      navigate("/inventory/remove-item");
    } else if (tab === "Add Item") {
      navigate("/inventory/add-item");
    } else {
      navigate("/inventory");
    }
  };

  useEffect(() => {
    refreshData();
  }, [location.pathname]);

  useEffect(() => {
    fetchLowStockCount();
  }, []);

  useEffect(() => {
    setActiveTab(pillList[0]);
  }, [isAdmin]);

  return (
    <InventoryContext.Provider
      value={{
        isAdmin,
        pillList,
        activeTab,
        setActiveTab,
        onTabClick,
        products,
        createItem,
        deleteItem,
        updateQuantity,
        loading,
        lowStockCount,
        updateUsage,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
