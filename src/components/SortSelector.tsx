import { useEffect } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import useAppStore from "../store";

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
  const currentPath = useLocation().pathname;
  const currentRouteIsEntries = currentPath.startsWith("/entries");

  const sortOrder = currentRouteIsEntries
    ? useAppStore().entryQueryStore().entryQuery.sortOrder
    : useAppStore().userQueryStore().userQuery.sortOrder;
  const setSortOrder = currentRouteIsEntries
    ? useAppStore().entryQueryStore((s) => s.setSortOrder)
    : useAppStore().userQueryStore((s) => s.setSortOrder);

  const sortOrders = currentRouteIsEntries ? entrySortOrders : userSortOrders;

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
