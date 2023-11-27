import { useState } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const SortSelector = () => {
  // Should access zustand and edit the query directly
  const [sortOrder, setSortOrder] = useState("");

  // Changes depending on current route
  // E.g : Users by followers, contents by likes, categories only by default
  const sortOrders = [
    { value: "", label: "Default" },
    { value: "likes", label: "Likes" },
    { value: "-likes", label: "Likes (Desc)" },
    { value: "timestamp", label: "Date created" },
    { value: "-timestamp", label: "Date created (Desc)" },
  ];

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        <Text marginLeft={{ base: -2, lg: 0 }} overflow={"hidden"}>
          Order by: {currentSortOrder?.label}
        </Text>
      </MenuButton>
      <MenuList>
        {sortOrders.map((order) => (
          <MenuItem
            value={order.value}
            key={order.value}
            onClick={() => setSortOrder(order.value)}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
