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

import ProfileAvatar from "./ProfileAvatar";
import FollowButton from "./FollowButton";
import EntryGrid from "./EntryGrid";
import User from "../entities/User";
import { getUser } from "../hooks/useUsers";
import { getTotalEntriesByUserName } from "../hooks/useEntries";
import useRefresh from "../hooks/useRefresh";
import peopleCount from "../utils/peopleCount";
import colors from "../config/colors";

interface Props {
  user: User;
  handleClose?: () => void;
}

const UserProfile = ({ user: selectedUser, handleClose = () => {} }: Props) => {
  const [entriesCount, setEntriesCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const handleRefresh = useRefresh();
  const currentUser = getUser(); // Gotten from state

  async function getTotalEntries() {
    setEntriesCount(await getTotalEntriesByUserName(selectedUser.username));
  }

  useEffect(() => {
    getTotalEntries();
    onOpen();
  }, []);

  return (
    <Modal
      onClose={() => {
        handleClose();
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
                  <Box height="30px" width="120px">
                    <FollowButton
                      currentUserId={currentUser._id}
                      userIdToFollow={selectedUser._id}
                      onFollow={handleRefresh}
                    />
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

            <Box marginTop={2}>
              <EntryGrid
                authorId={selectedUser._id}
                noOfColumns={{ base: 1, lg: 2, "3xl": 3, "5xl": 4 }}
              />
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
