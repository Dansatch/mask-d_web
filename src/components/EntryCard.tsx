import { useEffect, useState } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Card,
  CardBody,
  HStack,
  Grid,
  GridItem,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { FaRegComment } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

import ProfileAvatar from "./ProfileAvatar";
import LikeButton from "./LikeButton";
import PopUpAnimationBox from "./PopUpAnimationBox";
import CommentSection from "./CommentSection";
import FollowButton from "./FollowButton";
import Entry from "../entities/Entry";
import { getUser, getUserByUserId } from "../hooks/useUsers";
import { useEntryLikes } from "../hooks/useEntries";
import { getCommentsCount } from "../hooks/useComments";
import useRefresh from "../hooks/useRefresh";
import formatDate from "../utils/formatDate";
import peopleCount from "../utils/peopleCount";
import colors from "../config/colors";

interface EntryBodyProps {
  entryData: Entry;
  backgroundColor?: string;
  onOpen?: () => void;
}

const EntryBody = ({
  entryData: { _id: entryId, text, title, userId, timestamp: date, likes },
  backgroundColor,
  onOpen,
}: EntryBodyProps) => {
  const [authorName, setAuthorName] = useState("");
  const isLiked = likes?.includes(getUser()._id); // userIdFromZustand
  const handleRefresh = useRefresh();
  const currentUserId = getUser()._id; // userIdFromZustand

  const { handleLike: likeEntry, handleUnlike: unlikeEntry } = useEntryLikes(
    entryId,
    currentUserId
  );

  const handleLike = async () => {
    if (isLiked) await unlikeEntry();
    else await likeEntry();
  };

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
    <Card
      width={"100%"}
      height={"100%"}
      minHeight={"300px"}
      backgroundColor={backgroundColor}
      border="2px solid"
      borderColor={useColorModeValue("gray.50", "transparent")}
      cursor={"pointer"}
      onClick={onOpen}
    >
      <CardBody width={"100%"} height={"100%"} paddingX={3} paddingY={3}>
        <Grid
          h="100%"
          templateAreas={`"userDetails"
                      "entryData"
                      "userReactions"`}
          gridTemplateRows={"40px 1fr 25px"}
          gridTemplateColumns={"1fr"}
        >
          <GridItem
            area={"userDetails"}
            marginTop={-2}
            padding={0}
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
          >
            <HStack width={"100%"} spacing={1} paddingX={1}>
              <ProfileAvatar boxSize="35px" username={authorName} />

              <Text
                fontSize={"md"}
                textTransform={"uppercase"}
                fontWeight={"extrabold"}
                fontFamily={"mono"}
                color={useColorModeValue("gray.600", "gray.400")}
                marginTop={1}
              >
                {authorName}
              </Text>

              <Spacer />

              <Box
                marginRight={3}
                height="30px"
                width="80px"
                onClick={(event) => event.stopPropagation()}
              >
                <FollowButton
                  currentUserId={currentUserId}
                  userIdToFollow={userId}
                  colorSchemeEnabled={true}
                  onFollow={handleRefresh}
                />
              </Box>
            </HStack>
          </GridItem>

          <GridItem
            area={"entryData"}
            width={"100%"}
            fontSize={"16px"}
            lineHeight={"25px"}
            color={"#4a4a4a"}
            backgroundColor={useColorModeValue("#FFF6D5", "#E6D7A3")}
            border={`1px solid ${colors.darkTheme}`}
            borderRadius={"3px"}
            margin={"0 auto"}
            paddingX={"10px"}
            paddingBottom={"10px"}
            overflow={"hidden"}
            display={"flex"}
            flexDirection={"column"}
            boxShadow={`1px 1px 2px ${useColorModeValue("#E6D7A3", "#B3A74F")}`}
            _hover={{
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <Spacer />
            <Text
              textAlign={"left"}
              marginTop={1}
              textDecoration={"underline"}
              paddingLeft={2}
              fontFamily={"agbalumo"}
            >
              {formatDate(date)}
            </Text>

            <Spacer />
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text
                textAlign={"center"}
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
            </Box>
            <Spacer />

            <Text
              textAlign={"right"}
              marginY={2}
              textTransform={"capitalize"}
              paddingRight={6}
              fontFamily={"pacifico"}
              fontSize={"xl"}
            >
              {`${authorName}.`}
            </Text>
            <Spacer />
          </GridItem>

          <GridItem area={"userReactions"} marginBottom={-3}>
            <HStack
              fontSize={20}
              boxSize={"100%"}
              justifyContent={"space-around"}
            >
              <Box
                display={"flex"}
                onClick={(event) => event.stopPropagation()}
              >
                <LikeButton
                  isLiked={isLiked}
                  handleClick={async () => await handleLike()}
                />

                <Text
                  fontSize={"sm"}
                  marginLeft={1}
                  fontFamily={"sans-serif"}
                  marginTop={"1px"}
                  opacity={0.9}
                >
                  {peopleCount(likes)}
                </Text>
              </Box>

              <Box display={"flex"} onClick={() => {}}>
                <PopUpAnimationBox handleClick={() => {}}>
                  <FaRegComment />
                </PopUpAnimationBox>

                <Text
                  fontSize={"sm"}
                  marginLeft={1}
                  fontFamily={"sans-serif"}
                  marginTop={"1px"}
                  opacity={0.9}
                >
                  {peopleCount(getCommentsCount(entryId))}
                </Text>
              </Box>
            </HStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

interface Props {
  entryData: Entry;
  height?: string;
  width?: string;
}

const EntryCard = ({ entryData }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = useColorModeValue("", "black");
  const getScrollBehavior = () => {
    if (window.innerWidth < 992) return "inside";
    else return "outside";
  };

  return (
    <>
      <EntryBody
        entryData={entryData}
        onOpen={onOpen}
        backgroundColor={backgroundColor}
      />

      <Modal
        size={{ base: "full", lg: "lg" }}
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior={getScrollBehavior()}
      >
        <ModalOverlay />
        <ModalContent backgroundColor={backgroundColor}>
          <ModalHeader>
            <HStack
              spacing={1}
              onClick={onClose}
              cursor={"pointer"}
              transition={"0.15s"}
              _hover={{
                boxShadow: "lg",
                fontWeight: "bold",
                transform: "translateY(-3px)",
              }}
              boxSize={"fit-content"}
            >
              <BsArrowLeft />
              <Text fontSize={"md"}>Back</Text>
            </HStack>
          </ModalHeader>

          <ModalBody paddingX={2} paddingTop={0} marginTop={-1}>
            <Box height={"350px"}>
              <EntryBody
                entryData={entryData}
                backgroundColor={backgroundColor}
              />
            </Box>
            <Box>
              <CommentSection
                entryId={entryData._id}
                scrollBehavior={getScrollBehavior()}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EntryCard;
