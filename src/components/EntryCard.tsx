import { useState } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  Card,
  CardBody,
  HStack,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/layout";
import { EditIcon } from "@chakra-ui/icons";
import { FaRegComment } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import ProfileAvatar from "./ProfileAvatar";
import LikeButton from "./LikeButton";
import PopUpAnimationBox from "./PopUpAnimationBox";
import FollowButton from "./FollowButton";
import EntryForm from "./EntryForm";
import Entry from "../entities/Entry";
import { useUser } from "../hooks/useUsers";
import { useEntryLikes } from "../hooks/useEntries";
import { getCommentsCount } from "../hooks/useComments";
import useRefresh from "../hooks/useRefresh";
import formatDate from "../utils/formatDate";
import peopleCount from "../utils/peopleCount";
import colors from "../config/colors";
import useAppStore from "../store";

interface Props {
  entryData: Entry;
  isPreview?: boolean;
}

const EntryCard = ({
  entryData: {
    _id: entryId,
    text,
    title,
    userId,
    commentDisabled,
    timestamp: date,
    likes,
  },
  isPreview,
}: Props) => {
  const currentUserId = useAppStore().currentUser._id;
  const authorName = useUser(userId).data?.username;
  const isLiked = likes?.includes(currentUserId); // refactor out
  const handleRefresh = useRefresh();
  const backgroundColor = useColorModeValue("", "black");

  // Navigation variables
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const navigationPath = currentPath.startsWith("/users")
    ? `/users/${authorName}/entry/${entryId}`
    : `/entries/${entryId}`;

  // Liking mechanism
  const { handleLike: likeEntry, handleUnlike: unlikeEntry } =
    useEntryLikes(entryId);

  const handleLike = async () => {
    if (isLiked) await unlikeEntry();
    else await likeEntry();
  };

  return (
    <Card
      width={"100%"}
      height={"100%"}
      minHeight={"300px"}
      backgroundColor={backgroundColor}
      border="2px solid"
      borderColor={useColorModeValue("gray.50", "transparent")}
      cursor={"pointer"}
      onClick={() => navigate(navigationPath)}
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
              <ProfileAvatar boxSize="35px" username={authorName || ""} />

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
                onClick={(event) => event.stopPropagation()}
                display={isPreview ? "none" : "flex"}
              >
                {currentUserId !== userId ? (
                  <Box marginRight={3} height="30px" width="80px">
                    <FollowButton
                      selectedUserId={userId}
                      colorSchemeEnabled={true}
                      onFollow={handleRefresh}
                    />
                  </Box>
                ) : (
                  <EntryForm
                    displayComponent={
                      <EditIcon
                        marginRight={4}
                        marginBottom={1}
                        _hover={{
                          opacity: 0.7,
                        }}
                      />
                    }
                    entryData={{
                      _id: entryId,
                      commentDisabled,
                      text,
                      title,
                      timestamp: date,
                    }}
                  />
                )}
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

              <Box
                display={"flex"}
                onClick={() => {}}
                opacity={commentDisabled ? 0.3 : 1}
              >
                <PopUpAnimationBox
                  handleClick={() => {}}
                  isDisabled={commentDisabled}
                >
                  <FaRegComment />
                </PopUpAnimationBox>

                <Text
                  fontSize={"sm"}
                  marginLeft={1}
                  fontFamily={"sans-serif"}
                  marginTop={"1px"}
                  opacity={0.9}
                >
                  {commentDisabled
                    ? "-"
                    : peopleCount(getCommentsCount(entryId))}
                </Text>
              </Box>
            </HStack>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
};

export default EntryCard;
