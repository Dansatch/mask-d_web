import { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import User from "../entities/User";
import { Card, CardBody } from "@chakra-ui/card";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useNavigate } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";
import FollowButton from "./FollowButton";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import useRefresh from "../hooks/useRefresh";
import peopleCount from "../utils/peopleCount";

interface Props {
  userData: User;
}

const UserCard = ({ userData }: Props) => {
  const [entriesCount, setEntriesCount] = useState(0);
  const navigate = useNavigate();
  const handleRefresh = useRefresh();

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
        onClick={() => navigate(`/users/${userData.username}`)}
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

            <Box
              marginY={2}
              height={"35px"}
              onClick={(event) => event.stopPropagation()}
            >
              <FollowButton
                userIdToFollow={userData._id}
                colorSchemeEnabled={true}
                onFollow={handleRefresh}
              />
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default UserCard;
