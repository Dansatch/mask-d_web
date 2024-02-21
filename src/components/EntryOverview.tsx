import { useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import { useNavigate, useParams } from "react-router-dom";

import CommentSection from "./CommentSection";
import EntryCard from "./EntryCard";
import { useEntry } from "../hooks/useEntries";

const EntryOverview = () => {
  const { entryId } = useParams();
  const selectedEntry = useEntry(entryId || "").data;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const getScrollBehavior = () => {
    if (window.innerWidth < 992) return "inside";
    else return "outside";
  };

  useEffect(() => {
    onOpen();
  });

  return (
    <Modal
      size={{ base: "full", lg: "lg" }}
      motionPreset="slideInBottom"
      onClose={() => {
        navigate(-1); // navigates to last history
        onClose();
      }}
      isOpen={isOpen}
      isCentered
      scrollBehavior={getScrollBehavior()}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={useColorModeValue("", "black")}>
        <ModalHeader padding={2}>
          <ModalCloseButton zIndex={1} />
        </ModalHeader>

        <ModalBody paddingX={2}>
          <Box height={"350px"}>
            {selectedEntry && <EntryCard entryData={selectedEntry} />}
          </Box>
          <Box>
            {selectedEntry && !selectedEntry.commentDisabled && (
              <CommentSection
                entryId={selectedEntry._id}
                scrollBehavior={getScrollBehavior()}
              />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EntryOverview;
