import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import TimeBadge from "./TimeBadge";
import ExpandableText from "./ExpandableText";
import LikeButton from "./LikeButton";
import Comment from "../entities/Comment";
import peopleCount from "../utils/peopleCount";
import { useCommentLikes } from "../hooks/useComments";
import { useUser } from "../hooks/useUsers";
import ProfileAvatar from "./ProfileAvatar";
import useAppStore from "../store";

interface Props {
  comment: Comment;
}

const CommentBody = ({ comment }: Props) => {
  const currentUserId = useAppStore().currentUser._id;
  const [commentAuthorName, setCommentAuthorName] = useState("");
  const color = useColorModeValue("#3d3d3d", "gray.400");

  const isLiked = comment.likes.includes(currentUserId);
  const { handleLike: likeComment, handleUnlike: unlikeComment } =
    useCommentLikes(comment._id, comment.entryId);

  const handleLike = async () => {
    if (isLiked) await unlikeComment();
    else await likeComment();
  };

  useEffect(() => {
    const getAuthorName = async () => {
      try {
        const res = await useUser(comment.userId);
        if (res.data) setCommentAuthorName(res.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getAuthorName();
  }, []);

  return (
    <Grid
      templateAreas={`"avatar details likes"`}
      templateColumns={"70px 1fr 50px"}
      marginY={2}
    >
      <GridItem
        area={"avatar"}
        display={"flex"}
        justifyContent={"center"}
        px={3}
      >
        <ProfileAvatar username={commentAuthorName} boxSize={"40px"} />
      </GridItem>

      <GridItem area={"details"}>
        <VStack
          spacing={0}
          paddingRight={1}
          width={"100%"}
          alignItems={"start"}
          fontSize={"sm"}
        >
          <HStack>
            <Text
              color={color}
              fontWeight={"bold"}
            >{`${commentAuthorName}`}</Text>

            <Box marginTop={0.5}>
              <TimeBadge timestamp={comment.timestamp} />
            </Box>
          </HStack>

          <Box fontSize={{ base: 13, md: "md", lg: 13 }} lineHeight={"17px"}>
            <ExpandableText limit={100}>{comment.text}</ExpandableText>
          </Box>
        </VStack>
      </GridItem>

      <GridItem
        area={"likes"}
        marginRight={"3vw"}
        opacity={0.5}
        _hover={{
          opacity: 1,
        }}
        cursor={"pointer"}
      >
        <VStack
          marginTop={1}
          spacing={0}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box fontSize={"lg"}>
            <LikeButton isLiked={isLiked} handleClick={handleLike} />
          </Box>
          <Text color={color} fontSize={"xs"}>
            {peopleCount(comment.likes)}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
};

export default CommentBody;
