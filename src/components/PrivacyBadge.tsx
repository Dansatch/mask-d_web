import { Badge } from "@chakra-ui/react";

interface Props {
  isPrivate?: boolean;
}

const PrivacyBadge = ({ isPrivate }: Props) => {
  return (
    <Badge colorScheme={isPrivate ? "red" : "green"}>
      {isPrivate ? "Private" : "Public"}
    </Badge>
  );
};

export default PrivacyBadge;
