import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import AppButton from "./AppButton";
import ProfileAvatar from "./ProfileAvatar";
import User from "../entities/User";
import peopleCount from "../utils/peopleCount";
import { getUser, followUser, getUserByUsername } from "../hooks/useUser";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import colors from "../config/colors";

interface Props {
  username: string;
}

const UserProfile = ({ username }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [entriesCount, setEntriesCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const currentUser = getUser(); // Gotten from state

  async function getUserData() {
    const fetchedUser = await getUserByUsername(username);
    setSelectedUser(fetchedUser);
  }

  async function getTotalEntries() {
    setEntriesCount(await getTotalEntriesByUserName(username));
  }

  useEffect(() => {
    getUserData();
    getTotalEntries();
    onOpen();
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      size={{ base: "full", md: "md" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader padding={2}>
          <ModalCloseButton marginTop={-1} marginRight={-1} />
        </ModalHeader>

        <ModalBody>
          <Grid
            h="80px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(4, 1fr)"
            gap={1}
          >
            <GridItem
              rowSpan={3}
              colSpan={1}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <ProfileAvatar
                username={selectedUser?.username || ""}
                boxSize="80px"
              />
            </GridItem>

            <GridItem
              colSpan={3}
              rowSpan={2}
              padding={2}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <HStack
                width={"100%"}
                paddingX={1}
                justifyContent={"space-between"}
              >
                <Text fontFamily={"cursive"} fontWeight={"bold"}>
                  {`@${selectedUser?.username}`}
                </Text>

                {selectedUser?._id === currentUser._id ? (
                  <HStack
                    fontWeight={"bold"}
                    fontFamily={"sans-serif"}
                    cursor={"pointer"}
                    spacing={1}
                    _hover={{
                      opacity: 0.7,
                    }}
                  >
                    <Text>Edit</Text>
                    <EditIcon />
                  </HStack>
                ) : (
                  <AppButton
                    text="Follow"
                    height="30px"
                    width="120px"
                    fontSize="sm"
                    handleClick={async () => {
                      await followUser(
                        selectedUser?.username || "",
                        currentUser.username
                      );
                    }}
                  />
                )}
              </HStack>
            </GridItem>

            <GridItem
              colSpan={3}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              <HStack width={"100%"} p={1} justifyContent={"space-evenly"}>
                <Text
                  fontSize={"xs"}
                  fontFamily={"cursive"}
                  fontStyle={"italic"}
                >
                  {entriesCount} entries
                </Text>

                <Text
                  fontSize={"xs"}
                  fontFamily={"cursive"}
                  fontStyle={"italic"}
                >
                  {peopleCount(selectedUser?.followers || [])} followers
                </Text>

                {selectedUser?._id === currentUser._id ? (
                  <Text
                    fontSize={"xs"}
                    fontFamily={"cursive"}
                    fontStyle={"italic"}
                  >
                    {peopleCount(selectedUser?.following || [])} following
                  </Text>
                ) : null}
              </HStack>
            </GridItem>
          </Grid>

          <Box boxSize={"100%"} my={3}>
            <Box
              width={"fit-content"}
              py={2}
              paddingLeft={2}
              paddingRight={4}
              display={"flex"}
              textAlign={"left"}
              fontFamily={"sans-serif"}
              borderBottom={`2px solid ${color}`}
              color={color}
              transition={"0.05s"}
              _hover={{
                borderBottom: `1px solid ${color}`,
                color: color,
              }}
            >
              Entries{" "}
              <Text
                marginTop={1}
                marginLeft={1}
                fontSize={"xs"}
                fontFamily={"cursive"}
                fontStyle={"italic"}
                fontWeight={"thin"}
              >
                {`(${entriesCount})`}
              </Text>
            </Box>

            <Divider />

            <Box bg={"red"} height={"200px"} marginTop={5} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;