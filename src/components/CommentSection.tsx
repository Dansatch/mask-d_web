import React from "react";
import { Box, Divider, Text, useColorModeValue } from "@chakra-ui/react";

import useComments from "../hooks/useComments";
import CommentBody from "./CommentBody";
import CommentInput from "./CommentInput";
import colors from "../config/colors";

interface Props {
  entryId: string;
  scrollBehavior?: string;
}

const CommentSection = ({ entryId, scrollBehavior }: Props) => {
  const {
    data: comments,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useComments(entryId);

  return (
    <Box paddingTop={2}>
      {comments?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((comment, index) => (
            <React.Fragment key={index}>
              <CommentBody comment={comment} />
              <Divider marginBottom={1} />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      {hasNextPage && (
        <Text
          width={"100%"}
          textAlign={"center"}
          cursor={"pointer"}
          my={2}
          fontFamily={"monospace"}
          onClick={() => fetchNextPage()}
          _hover={{
            color: "inherit",
            fontWeight: "bold",
            transform: "translateY(-2px)",
            transition: "0.15s",
          }}
        >
          {isFetchingNextPage ? "Loading..." : "- - - Load more comments - - -"}
        </Text>
      )}

      <Box
        position={"sticky"}
        bottom={scrollBehavior === "inside" ? "-11px" : -1}
        backgroundColor={useColorModeValue(colors.white, colors.black)}
        zIndex={1}
        mx={-2}
      >
        <CommentInput entryId={entryId} />
      </Box>
    </Box>
  );
};

export default CommentSection;
