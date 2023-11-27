import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const options = [
  // { value: "", label: "Default" },
  { value: "today", label: "Today" },
  { value: "lastWeek", label: "Last week" },
  { value: "lastMonth", label: "Last month" },
  { value: "allTime", label: "All time" },
];

const TimePeriodSelector = () => {
  // Should access zustand and edit the query directly
  // Map with options label and use the value for the query
  const [timePeriod, setTimePeriod] = useState("Today");

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        <Text overflow={"hidden"}>{timePeriod || "Time Period"}</Text>
      </MenuButton>
      <MenuList maxHeight={"70vh"} overflowY={"auto"}>
        {options?.map((option) => (
          <MenuItem
            onClick={() => setTimePeriod(option.label)}
            key={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default TimePeriodSelector;
