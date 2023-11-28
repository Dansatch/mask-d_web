import {
  Card,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";

const UserCardSkeleton = () => {
  return (
    <Card width={"100%"} height={"100%"} padding={2}>
      <VStack boxSize={"100%"} spacing={3}>
        <SkeletonCircle boxSize={"130px"} />

        <SkeletonText noOfLines={1}>Username182</SkeletonText>
        <HStack>
          <SkeletonText noOfLines={1}>0000 entries</SkeletonText>
          <SkeletonText noOfLines={1}>00 followers</SkeletonText>
        </HStack>

        <Skeleton height={"30px"} width={"80px"} />
      </VStack>
    </Card>
  );
};

export default UserCardSkeleton;
