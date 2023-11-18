import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { Entry } from "../entities/Entry";
import { getUserByUserId } from "../hooks/useUser";
import formatDate from "../utils/formatDate";
import colors from "../config/colors";
import { useColorModeValue } from "@chakra-ui/color-mode";

interface Props {
  entryData: Entry;
  height?: string;
  width?: string;
}

const EntryCard = ({
  entryData: { text, title, userId, timestamp: date },
  height = "350px",
  width = "350px",
}: Props) => {
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const getAuthorName = async () => {
      try {
        const userData = await getUserByUserId(userId);

        // Assuming userData contains the author's name
        if (userData && userData.username) {
          setAuthorName(userData.username);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getAuthorName();
  }, []);

  return (
    <Box
      maxWidth={"90vw"}
      width={width}
      height={height}
      fontSize={"16px"}
      color={"#4a4a4a"}
      backgroundColor={useColorModeValue("#FFF6D5", "#E6D7A3")}
      margin={"0 auto"}
      paddingBottom={"5px"}
      position={"relative"}
      border={`1px solid ${colors.darkTheme}`}
      // Extra borders
      _before={{
        content: '""',
        zIndex: -1,
        margin: "0 1px",
        maxWidth: "710px",
        width: "100%",
        height: "100%",
        position: "absolute",
        bottom: "-3px",
        left: 0,
        background: "white",
        border: `1px solid ${colors.darkTheme}`,
        boxShadow: `3px 3px 8px ${useColorModeValue("#E6D7A3", "#B3A74F")}`,
      }}
    >
      <Box
        paddingX={"10px"}
        paddingBottom={"10px"}
        position={"relative"}
        height={"inherit"}
        overflowY={"hidden"}
        _hover={{
          cursor: "pointer",
          overflowY: "auto",
        }}
        lineHeight={"25px"}
      >
        <Text
          textAlign={"left"}
          marginTop={3}
          textDecoration={"underline"}
          paddingLeft={2}
          fontFamily={"agbalumo"}
        >
          {formatDate(date)}
        </Text>

        <Text
          textAlign={"center"}
          textIndent={"2em"}
          textTransform={"uppercase"}
          fontWeight={"bold"}
          fontFamily={"heading"}
        >
          {title}
        </Text>

        <Text
          textAlign={"center"}
          textIndent={"2em"}
          fontFamily={"shantellSans"}
        >
          {text}
        </Text>

        <Text
          textAlign={"right"}
          marginY={3}
          textTransform={"capitalize"}
          paddingRight={6}
          fontFamily={"pacifico"}
          fontSize={"xl"}
        >
          {`${authorName}.`}
        </Text>
      </Box>
    </Box>
  );
};

export default EntryCard;
