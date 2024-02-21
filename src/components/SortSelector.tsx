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
  { value: "", label: "Default" },
  { value: "followers", label: "Followers" },
  // { value: "entries", label: "Entries" },
];

const entrySortOptions = [
  { value: "", label: "Default" },
  { value: "likes", label: "Likes" },
  { value: "-likes", label: "Likes (Desc)" },
  { value: "timestamp", label: "Date created" },
  { value: "-timestamp", label: "Date created (Desc)" },
];

const SortSelector = () => {
  const currentPath = useLocation().pathname;
  const currentRouteIsEntries = currentPath.startsWith("/entries");

  const sortOption = currentRouteIsEntries
    ? useAppStore().entryQueryStore().entryQuery.sortOption
    : useAppStore().userQueryStore().userQuery.sortOption;
  const setSortOption = currentRouteIsEntries
    ? useAppStore().entryQueryStore((s) => s.setSortOption)
    : useAppStore().userQueryStore((s) => s.setSortOption);

  const sortOrders = currentRouteIsEntries ? entrySortOptions : userSortOptions;

  const currentSortOrder = sortOrders.find(
    (order) => order.value === sortOption
  );

  useEffect(() => {
    setSortOption("");
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
