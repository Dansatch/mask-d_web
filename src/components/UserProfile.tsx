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
import { useNavigate, useParams } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";
import FollowButton from "./FollowButton";
import EntryGrid from "./EntryGrid";
import PrivacyBadge from "./PrivacyBadge";
import User from "../entities/User";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import { getUserByUsername } from "../hooks/useUsers";
import useRefresh from "../hooks/useRefresh";
import peopleCount from "../utils/peopleCount";
import colors from "../config/colors";
import useAppStore from "../store";

const UserProfile = () => {
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [entriesCount, setEntriesCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const handleRefresh = useRefresh();
  const currentUser = useAppStore().currentUser;
  const { username: selectedUsername } = useParams();
  const navigate = useNavigate();
  const hideEntries =
    selectedUser?.isPrivate && selectedUser?._id !== currentUser._id;

  async function getSelectedUser() {
    setSelectedUser(await getUserByUsername(selectedUsername || ""));
  }

  async function getTotalEntries() {
    selectedUser &&
      setEntriesCount(await getTotalEntriesByUserName(selectedUser.username));
  }

  useEffect(() => {
    getSelectedUser();
    getTotalEntries();
    onOpen();
  }, []);

  return (
    <Modal
      onClose={() => {
        navigate(-1); // navigates to last history
        onClose();
      }}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      scrollBehavior="outside"
      size={{
        base: "full",
        md: "lg",
        lg: "xl",
        xl: "2xl",
        "2xl": "4xl",
        "3xl": "5xl",
        "4xl": "6xl",
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader padding={2}>
          <ModalCloseButton marginTop={-1} marginRight={-1} />
        </ModalHeader>

        <ModalBody paddingBottom={0}>
          <Grid
            h="80px"
            width={{ base: "", md: "380px", "3xl": "420px" }}
            marginX={"auto"}
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
              flexDirection={"column"}
            >
              <ProfileAvatar
                username={selectedUser?.username || ""}
                boxSize="80px"
              />

              <Box marginTop={"2px"}>
                <PrivacyBadge isPrivate={selectedUser?.isPrivate} />
              </Box>
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
                  <Box height="30px" width="120px">
                    {selectedUser && (
                      <FollowButton
                        userIdToFollow={selectedUser._id}
                        onFollow={handleRefresh}
                      />
                    )}
                  </Box>
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
              fontFamily={"playpenSans"}
              borderBottom={`2px solid ${color}`}
              color={color}
              transition={"0.05s"}
              _hover={{
                borderBottom: `1px solid ${color}`,
                color: color,
              }}
            >
              Entries{" "}
              {!hideEntries && (
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
              )}
            </Box>

            <Divider />

            {selectedUser && (
              <Box marginTop={2}>
                {hideEntries ? (
                  <Text
                    fontStyle={"italic"}
                    color={colors.medium}
                    marginLeft={1}
                  >{`${selectedUser.username}'s entries are private`}</Text>
                ) : (
                  <EntryGrid
                    authorId={selectedUser._id}
                    noOfColumns={{ base: 1, lg: 2, "3xl": 3, "5xl": 4 }}
                  />
                )}
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
