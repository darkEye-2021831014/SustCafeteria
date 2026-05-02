import MenuItem from "./MenuItem";

const MenuItemList = ({ items = [], activeCategory = "All", onItemClick }) => {
  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div className="flex flex-wrap gap-10 w-[70%] h-full p-5">
      {visibleItems.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          image={item.image}
          handleClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
};

export default MenuItemList;
