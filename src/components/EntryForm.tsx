import { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { useDisclosure } from "@chakra-ui/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import TextAreaInput from "./TextAreaInput";
import AppButton from "./AppButton";
import EntryCard from "./EntryCard";
import Entry from "../entities/Entry";
import { getUser } from "../hooks/useUser";
import { createEntry } from "../hooks/useEntries";
import colors from "../config/colors";

const schema = z.object({
  title: z.string(),
  text: z.string({ required_error: "Text cannot be empty" }),
});

type FormData = z.infer<typeof schema>;

const EntryForm = () => {
  const [showPreview, setShowPreview] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue(colors.lightTheme, colors.darkTheme);
  const currentUser = getUser(); // Gotten from state
  const maxTitleLength = 40;
  const maxTextLength = 2048;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  let titleLength: number = watch("title")?.length || 0;
  let textLength: number = watch("text")?.length || 0;
  let timestamp: Date = new Date();

  const onSubmit = async ({ title, text }: z.infer<typeof schema>) => {
    await createEntry({
      title,
      text,
      userId: currentUser._id,
      timestamp,
    });
  };

  useEffect(() => {
    onOpen();
    setShowPreview(false);
  }, []);

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        scrollBehavior="outside"
        size={{ base: "full", md: "md" }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={useColorModeValue("gray.200", "gray.800")}
        >
          <ModalCloseButton />
          <ModalHeader>
            <Text fontFamily={"sans-serif"} fontSize={"md"}>
              Begin Your Entry: What's on Your Mind?
            </Text>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack>
                <Box width={"100%"}>
                  <FormInput
                    type="text"
                    hideFocusBorder={true}
                    isRequired={true}
                    register={register("title")}
                    placeholder="A short title for your entry?"
                    errorMessage={errors.title?.message}
                    maxLength={maxTitleLength}
                    styles={{
                      borderRadius: "0px",
                      paddingLeft: 5,
                      borderBottomWidth: "1px",
                      borderColor: useColorModeValue(
                        colors.lightTheme,
                        colors.darkTheme
                      ),
                      borderStyle: "none none solid none",
                    }}
                  />

                  <Text
                    textAlign={"right"}
                    paddingRight={1}
                    fontSize={"xs"}
                    fontStyle={"italic"}
                    fontFamily={"serif"}
                    color={
                      titleLength >= maxTitleLength
                        ? "red"
                        : useColorModeValue("gray.600", "gray.400")
                    }
                  >
                    {`${titleLength}/${maxTitleLength}`}
                  </Text>
                </Box>

                <Box width={"100%"}>
                  <TextAreaInput
                    type="text"
                    label="Today's story starts here..."
                    placeholder="What's up?...."
                    register={register("text")}
                    isRequired={true}
                    maxLength={maxTextLength}
                    focusBorderColor={color}
                    labelStyles={{
                      marginLeft: "4px",
                      fontWeight: "normal",
                    }}
                    styles={{
                      height: "350px",
                      borderColor: color,
                      boxShadow: `1px 1px 7px ${color}`,
                      fontFamily: "serif",
                    }}
                  />

                  <Text
                    textAlign={"right"}
                    paddingRight={1}
                    fontSize={"xs"}
                    fontStyle={"italic"}
                    fontFamily={"serif"}
                    color={
                      textLength >= maxTextLength
                        ? "red"
                        : useColorModeValue("gray.600", "gray.400")
                    }
                  >
                    {`${textLength}/${maxTextLength}`}
                  </Text>
                </Box>

                <Box
                  width={"100%"}
                  display={"flex"}
                  alignItems={"end"}
                  justifyContent={"end"}
                  paddingRight={1}
                >
                  <AppButton
                    text="Next"
                    isDisabled={textLength <= 0}
                    handleClick={() => {
                      // Updates timestamp and opens modal
                      timestamp = new Date();
                      setShowPreview(true);
                    }}
                  />
                </Box>
              </VStack>

              {showPreview && (
                <EntryPreviewModal
                  entryData={{
                    _id: "",
                    title: watch("title"),
                    text: watch("text"),
                    userId: currentUser._id,
                    timestamp,
                    likes: [],
                    comments: [],
                  }}
                  handleClose={() => setShowPreview(false)}
                  handleSubmit={handleSubmit(onSubmit)}
                />
              )}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

interface EntryPreviewModalProps {
  entryData: Entry;
  handleClose: () => void;
  handleSubmit: () => void;
}

const EntryPreviewModal = ({
  entryData,
  handleClose,
  handleSubmit,
}: EntryPreviewModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleClose();
        onClose();
      }}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent backgroundColor={useColorModeValue("gray.200", "gray.800")}>
        <ModalHeader>Preview</ModalHeader>

        <ModalBody>
          <Box boxSize={"350px"} margin={"0 auto"}>
            <EntryCard entryData={entryData} />
          </Box>
        </ModalBody>

        <ModalFooter>
          <HStack>
            <AppButton
              text="Go Back"
              handleClick={() => {
                handleClose();
                onClose();
              }}
              fontSize="sm"
              width="100px"
            />
            <AppButton text="Post" handleClick={handleSubmit} />
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EntryForm;
