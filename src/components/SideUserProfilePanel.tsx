import { useEffect, useState } from "react";
import { Box, Center, Divider, HStack, Text, VStack } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/color-mode";

import ProfileAvatar from "./ProfileAvatar";
import User from "../entities/User";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import peopleCount from "../utils/peopleCount";
import colors from "../config/colors";
import EntryGrid from "./EntryGrid";

// Refactor user props to zustand state
interface Props {
  user: User;
}

const SideUserProfilePanel = ({ user }: Props) => {
  const [entriesCount, setEntriesCount] = useState(0);
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const gray100 = "#EDEDED"; // gray.100

  async function getTotalEntries() {
    setEntriesCount(await getTotalEntriesByUserName(user.username));
  }

  useEffect(() => {
    getTotalEntries();
  }, []);

  return (
    <VStack
      border={`1px solid ${useColorModeValue(gray100, "black")}`}
      minHeight={"100%"}
      boxShadow={`5px 5px 5px 5px ${useColorModeValue(gray100, "black")}`}
      display={"flex"}
      alignItems={"center"}
      paddingTop={4}
      paddingBottom={"60px"}
      paddingX={1}
    >
      <Center borderRadius={"50%"}>
        <ProfileAvatar username={user.username} boxSize="150px" />
      </Center>

      <Text fontFamily={"playpenSans"} fontWeight={"bold"}>
        {user.username}
      </Text>

      <HStack
        marginTop={3}
        width={"100%"}
        color={useColorModeValue("gray.700", "gray.300")}
        justifyContent={"space-around"}
      >
        <Text fontFamily={"cursive"} fontStyle={"italic"}>
          {peopleCount(user?.followers || [])} followers
        </Text>

        <Text fontFamily={"cursive"} fontStyle={"italic"}>
          {peopleCount(user?.following || [])} following
        </Text>
      </HStack>

      <Text
        fontFamily={"cursive"}
        fontStyle={"italic"}
        color={useColorModeValue("gray.700", "gray.300")}
        marginX={"auto"}
        marginTop={1}
      >
        {entriesCount} entries
      </Text>

      <Box marginTop={4} width={"100%"}>
        <Text
          width={"fit-content"}
          color={color}
          textAlign={"left"}
          textTransform={"capitalize"}
          fontFamily={"playpenSans"}
          fontWeight={"bold"}
        >
          Top Entries
        </Text>

        <Divider backgroundColor={color} width={"40%"} marginTop={0} />

        {/* <Box width={"100%"} border={"2px solid red"}> */}
        <EntryGrid authorId={user._id} noOfColumns={1} mostLiked={true} />
        {/* </Box> */}
      </Box>
    </VStack>
  );
};

export default SideUserProfilePanel;
