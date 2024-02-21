import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import useAppStore from "../store";
import { useLocation } from "react-router-dom";

const options = [
  // { value: "", label: "Default" },
  { value: "today", label: "Today" },
  { value: "lastWeek", label: "Last week" },
  { value: "lastMonth", label: "Last month" },
  { value: "lastYear", label: "Last year" },
  { value: "allTime", label: "All time" },
];

const TimeFilterSelector = () => {
  const [filterLabel, setFilterLabel] = useState("Today");
  const filterValue =
    useAppStore().entryQueryStore().entryQuery.timeFilterValue;
  const setFilterValue = useAppStore().entryQueryStore().setTimeFilterValue;
  const currentPath = useLocation().pathname;
  const currentRouteIsUsers = currentPath.startsWith("/users");

  useEffect(() => {
    const selectedLabel = options.find(
      (opt) => opt.value === filterValue
    )?.label;

    setFilterLabel(selectedLabel || "");
  }, [filterValue]);

  useEffect(() => {
    setFilterValue("today");
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        isDisabled={currentRouteIsUsers}
        rightIcon={<BsChevronDown />}
      >
        <Text overflow={"hidden"}>{filterLabel}</Text>
      </MenuButton>
      <MenuList maxHeight={"70vh"} overflowY={"auto"}>
        {options?.map((option) => (
          <MenuItem
            onClick={() => setFilterValue(option.value)}
            key={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TimeFilterSelector;
