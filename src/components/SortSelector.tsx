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

const userSortOptions = [
  { value: "username", label: "Default" },
  { value: "-followers", label: "Followers" },
  // { value: "entries", label: "Entries" },
];

const entrySortOptions = [
  { value: "-likes", label: "Default" },
  { value: "likes", label: "Likes" },
  { value: "-likes", label: "Likes (Desc)" },
  { value: "timestamp", label: "Date created" },
  { value: "-timestamp", label: "Date created (Desc)" },
];

const SortSelector = () => {
  const currentPath = useLocation().pathname;
  const currentRouteIsUsers = currentPath.startsWith("/users");

  const sortOption = currentRouteIsUsers
    ? useAppStore().userQueryStore().userQuery.sortOption
    : useAppStore().entryQueryStore().entryQuery.sortOption;
  const setSortOption = currentRouteIsUsers
    ? useAppStore().userQueryStore((s) => s.setSortOption)
    : useAppStore().entryQueryStore((s) => s.setSortOption);

  const sortOrders = currentRouteIsUsers ? userSortOptions : entrySortOptions;

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOption
  );

  useEffect(() => {
    setSortOption("likes");
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
            key={order.label}
            onClick={() => setSortOption(order.value)}
          >
            {order.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
