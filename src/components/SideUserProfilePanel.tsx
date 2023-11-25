import { Box, Center, Divider, HStack, Text, VStack } from "@chakra-ui/layout";
import User from "../entities/User";
import ProfileAvatar from "./ProfileAvatar";
import peopleCount from "../utils/peopleCount";
import { useEffect, useState } from "react";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import { useColorModeValue } from "@chakra-ui/color-mode";
import colors from "../config/colors";

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
      boxShadow={`5px 5px 5px 5px ${useColorModeValue(gray100, "black")}`}
      display={"flex"}
      alignItems={"center"}
      paddingTop={4}
      paddingX={2}
    >
      <Center border={"2px solid"} borderRadius={"50%"}>
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
          {entriesCount} entries
        </Text>

        <Text fontFamily={"cursive"} fontStyle={"italic"}>
          {peopleCount(user?.followers || [])} followers
        </Text>
      </HStack>

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

        {/* Entries grid for top user's entries */}
        <Box
          width={"100%"}
          marginY={2}
          backgroundColor={"red"}
          height={"300px"}
        />
      </Box>
    </VStack>
  );
};

export default SideUserProfilePanel;
