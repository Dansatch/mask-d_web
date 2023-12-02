import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useAppStore from "../store";
import { useEffect } from "react";

const userSortOrders = [
  { value: "", label: "Default" },
  { value: "followers", label: "Followers" },
  { value: "entries", label: "Entries" },
];

const entrySortOrders = [
  { value: "", label: "Default" },
  { value: "likes", label: "Likes" },
  { value: "-likes", label: "Likes (Desc)" },
  { value: "timestamp", label: "Date created" },
  { value: "-timestamp", label: "Date created (Desc)" },
];

const SortSelector = () => {
  const currentRoute = "/entries"; // Gotten from nav

  const sortOrder =
    currentRoute === "/entries"
      ? useAppStore().entryQueryStore().entryQuery.sortOrder
      : useAppStore().userQueryStore().userQuery.sortOrder;
  const setSortOrder =
    currentRoute === "/entries"
      ? useAppStore().entryQueryStore((s) => s.setSortOrder)
      : useAppStore().userQueryStore((s) => s.setSortOrder);

  const sortOrders =
    currentRoute === "/entries" ? entrySortOrders : userSortOrders;

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOrder
  );

  useEffect(() => {
    setSortOrder("");
  }, []);

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
