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
  const [selectedTimeFilterLabel, setTimeFilterLabel] = useState("Today");
  const selectedTimeFilterValue =
    useAppStore().entryQueryStore().entryQuery.timeFilterValue;
  const setTimeFilterValue = useAppStore().entryQueryStore(
    (s) => s.setTimeFilterValue
  );
  const currentPath = useLocation().pathname;
  const currentRouteIsUsers = currentPath.startsWith("/users");

  useEffect(() => {
    const selectedLabel = options.find(
      (opt) => opt.value === selectedTimeFilterValue
    )?.label;

    setTimeFilterLabel(selectedLabel || "");
  }, [selectedTimeFilterValue]);

  useEffect(() => {
    setTimeFilterValue("today");
  }, []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        isDisabled={currentRouteIsUsers}
        rightIcon={<BsChevronDown />}
      >
        <Text overflow={"hidden"}>{selectedTimeFilterLabel}</Text>
      </MenuButton>
      <MenuList maxHeight={"70vh"} overflowY={"auto"}>
        {options?.map((option) => (
          <MenuItem
            onClick={() => setTimeFilterValue(option.value)}
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
