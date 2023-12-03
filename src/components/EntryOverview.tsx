import { useEffect, useState } from "react";
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
import Entry from "../entities/Entry";
import { useEntry } from "../hooks/useEntries";

const EntryOverview = () => {
  const [entryData, setEntryData] = useState<Entry | undefined>(undefined);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { entryId } = useParams();
  const navigate = useNavigate();

  const getEntryData = async () => {
    setEntryData(await useEntry(entryId || ""));
  };

  const getScrollBehavior = () => {
    if (window.innerWidth < 992) return "inside";
    else return "outside";
  };

  useEffect(() => {
    getEntryData();
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
            {entryData && <EntryCard entryData={entryData} />}
          </Box>
          <Box>
            {entryData && (
              <CommentSection
                entryId={entryData._id}
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
