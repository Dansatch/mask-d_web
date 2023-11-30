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

  // Changes between userSortOrders and entrySortOrders depending on current route

  const userSortOrders = [
    { value: "", label: "Default" },
    { value: "followers", label: "Followers" },
    { value: "entries", label: "Entries" },
  ];
  userSortOrders;

  const entrySortOrders = [
    { value: "", label: "Default" },
    { value: "likes", label: "Likes" },
    { value: "-likes", label: "Likes (Desc)" },
    { value: "timestamp", label: "Date created" },
    { value: "-timestamp", label: "Date created (Desc)" },
  ];

  const currentSortOrder = entrySortOrders.find(
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
        {entrySortOrders.map((order) => (
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
