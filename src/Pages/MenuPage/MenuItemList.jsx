import PlainRice from "../../assets/MenuItemImages/PlainRice.webp";
import MenuItem from "./MenuItem";
import { useOrderContext } from "../../contexts/OrderContext/OrderContext";

const MenuItemList = ({ category }) => {
  const { addItem } = useOrderContext();

  let items = [];
  for (let i = 0; i < 3; i++) {
    let curItem = [];
    for (let j = 0; j < 5; j++) {
      curItem.push({
        id: j + 5 * i,
        name: "সাদা ভাত",
        qty: 1,
        price: 20,
        image: PlainRice,
        category: ["Breakfast", "Lunch", "Miscellaneous"][i],
      });
    }
    items.push(curItem);
  }
  console.log(items);
  console.log(category);

  const menuItemList =
    category === "All"
      ? items
      : items
          .map((row) => row.filter((item) => item.category === category))
          .filter((row) => row.length > 0);
  // 5 items in a Row
  const menu = menuItemList.map((rowItems, rowIndex) => (
    <div
      key={rowIndex}
      className="flex justify-around items-center w-full h-fit"
    >
      {rowItems.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          handleClick={() => addItem(item)}
        />
      ))}
    </div>
  ));
  return <div className="flex flex-col w-[70%] h-full gap-10 p-5">{menu}</div>;
};

export default MenuItemList;
