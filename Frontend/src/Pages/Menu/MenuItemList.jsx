import MenuItem from "./MenuItem";

const MenuItemList = ({
  items = [],
  activeCategory = "All",
  onItemClick,
  className = "",
}) => {
  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-12 p-6 ${className} h-fit w-full`}
    >
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
