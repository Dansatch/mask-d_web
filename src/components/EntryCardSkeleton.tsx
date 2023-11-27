import {
  Card,
  Grid,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
} from "@chakra-ui/react";
import { FaRegComment } from "react-icons/fa";
import { HiHandThumbUp } from "react-icons/hi2";

const EntryCardSkeleton = () => {
  return (
    <Card width={"100%"} height={"100%"} paddingX={3} paddingY={2}>
      <Grid
        h="100%"
        templateAreas={`"userDetails"
                    "entryData"
                    "userReactions"`}
        gridTemplateRows={"40px 1fr 25px"}
        gridTemplateColumns={"1fr"}
      >
        <HStack
          gridArea={"userDetails"}
          justifyContent={"center"}
          alignItems={"center"}
          paddingX={1}
        >
          <SkeletonCircle boxSize={"35px"} />
          <SkeletonText noOfLines={1} width={"70px"} marginTop={1} />
          <Spacer />
          <Skeleton
            marginRight={2}
            height={"30px"}
            width={"70px"}
            borderRadius={"5px"}
          />
        </HStack>

        <Skeleton gridArea={"entryData"} marginY={3} borderRadius={"5px"} />

        <HStack
          gridArea={"userReactions"}
          width={"100%"}
          fontSize={"20px"}
          justifyContent={"space-around"}
        >
          <Skeleton borderRadius={6} display={"flex"}>
            <HiHandThumbUp />
            219
          </Skeleton>
          <Skeleton borderRadius={6} display={"flex"}>
            <FaRegComment />
            219
          </Skeleton>
        </HStack>
      </Grid>
    </Card>
  );
};

export default EntryCardSkeleton;
