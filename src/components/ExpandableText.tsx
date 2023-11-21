import { Box, Text, chakra } from "@chakra-ui/react";
import { useState } from "react";
import colors from "../config/colors";

interface Props {
  children: string;
  limit?: number;
}

const ExpandableText = ({ children, limit = 70 }: Props) => {
  const [expanded, setExpanded] = useState(false);

  if (!children) return null;

  if (children.length <= limit) return <Text>{children}</Text>;

  const summary = expanded ? children : children.substring(0, limit);

  return (
    <Box display={"flex"}>
      <Text wordBreak={"break-all"}>
        {summary}{" "}
        <chakra.span
          cursor={"pointer"}
          color={colors.medium}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "show less" : "...more"}
        </chakra.span>
      </Text>
    </Box>
  );
};

export default ExpandableText;
