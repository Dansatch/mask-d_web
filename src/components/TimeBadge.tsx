import { HStack, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { BiWorld } from "react-icons/bi";

interface Props {
  timestamp: Date;
}

const TimeBadge = ({ timestamp }: Props) => {
  const color = useColorModeValue("#3d3d3d", "gray.400");

  const formatDate = (timestamp: Date) => {
    const currentDate = new Date();
    const date = new Date(timestamp);

    const diffInMilliseconds = currentDate.getTime() - date.getTime();
    const diffInMinutes = diffInMilliseconds / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInWeeks = diffInDays / 7;
    const diffInMonths = diffInDays / 30;

    if (diffInMinutes < 1) return "Just now";
    else if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m`;
    else if (diffInDays < 1) return `${Math.floor(diffInHours)}h`;
    else if (diffInWeeks < 1) return `${Math.floor(diffInDays)}d`;
    else return `${Math.floor(diffInMonths)}m`;
  };

  return (
    <HStack spacing={0.5} fontSize={15} color={color}>
      <Text fontSize="xs">{formatDate(timestamp)}</Text>
      <Icon as={BiWorld} boxSize="14px" />
    </HStack>
  );
};

export default TimeBadge;
