import PlainRice from "../../assets/MenuItemImages/PlainRice.webp";
import MenuItem from "./MenuItem";

const MenuItemList = ({ onClick }) => {
  let menuItemList = [];
  for (let i = 0; i < 3; i++) {
    let curItem = [];
    for (let j = 0; j < 5; j++) {
      curItem.push({
        id: j + 5 * i,
        name: "সাদা ভাত",
        price: "২০.০০",
        image: PlainRice,
      });
    }
    menuItemList.push(curItem);
  }
  // 5 items in a Row
  const menu = menuItemList.map((rowItems, rowIndex) => (
    <div
      key={rowIndex}
      className="flex justify-around items-center w-full h-fit"
    >
      {rowItems.map(({ id, name, price, image }) => (
        <MenuItem
          key={id}
          name={name}
          price={price}
          image={image}
          handleClick={() => onClick({ id, name, price, image })}
        />
      ))}
    </div>
  ));
  return <div className="flex flex-col w-[70%] h-full gap-10 p-5">{menu}</div>;
};

export default MenuItemList;
