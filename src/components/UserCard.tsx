import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import User from "../entities/User";
import { Card, CardBody } from "@chakra-ui/card";
import { useColorModeValue } from "@chakra-ui/color-mode";
import ProfileAvatar from "./ProfileAvatar";
import peopleCount from "../utils/peopleCount";
import { useEffect, useState } from "react";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import AppButton from "./AppButton";
import UserProfile from "./UserProfile";

interface Props {
  userData: User;
}

const UserCard = ({ userData }: Props) => {
  const [entriesCount, setEntriesCount] = useState(0);
  const [showFullProfile, setShowFullProfile] = useState(false);

  async function getTotalEntries() {
    setEntriesCount(await getTotalEntriesByUserName(userData.username));
  }

  useEffect(() => {
    getTotalEntries();
  }, []);

  return (
    <>
      <Card
        width={"100%"}
        height={"100%"}
        backgroundColor={useColorModeValue("", "black")}
        border="2px solid"
        borderColor={useColorModeValue("gray.50", "transparent")}
        cursor={"pointer"}
        onClick={() => setShowFullProfile(true)}
      >
        <CardBody padding={2}>
          <VStack boxSize={"100%"} spacing={1}>
            <ProfileAvatar boxSize="130px" username={userData.username} />

            <Text fontFamily={"playpenSans"} fontWeight={"bold"}>
              {userData.username}
            </Text>

            <HStack
              marginTop={2}
              width={"100%"}
              color={useColorModeValue("gray.700", "gray.300")}
              justifyContent={"space-around"}
            >
              <Text fontFamily={"cursive"} fontStyle={"italic"}>
                {entriesCount} entries
              </Text>

              <Text fontFamily={"cursive"} fontStyle={"italic"}>
                {peopleCount(userData?.followers || [])} followers
              </Text>
            </HStack>

            <Box marginY={2}>
              <AppButton
                text="FOLLOW"
                height="35px"
                fontSize="xs"
                colorSchemeEnabled={true}
              />
            </Box>
          </VStack>
        </CardBody>
      </Card>

      {showFullProfile && (
        <UserProfile
          user={userData}
          handleClose={() => setShowFullProfile(false)}
        />
      )}
    </>
  );
};

export default UserCard;
