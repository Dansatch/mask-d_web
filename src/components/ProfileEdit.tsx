import { useEffect, useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import AppButton from "./AppButton";
import { useUserUpdate } from "../hooks/useUsers";
import colors from "../config/colors";
import useAppStore from "../store";

const passwordUpdateSchema = z
  .object({
    oldPassword: z.string({ required_error: "Old Password cannot be empty" }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long" })
      .refine((value) => /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value), {
        message:
          "New password must contain at least 1 uppercase letter, 1 symbol, and be at least 8 characters long",
      }),
    confirmNewPassword: z.string({
      required_error: "Confirm Password cannot be empty",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });

type FormData = z.infer<typeof passwordUpdateSchema>;

interface UpdateProps {
  handleClose: () => void;
}

const PasswordUpdate = ({ handleClose }: UpdateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(passwordUpdateSchema) });
  const { updateUserPassword } = useUserUpdate();

  const closeModal = () => {
    handleClose();
    onClose();
  };

  const onSubmit = async ({ oldPassword, newPassword }: FieldValues) => {
    toast.promise(
      updateUserPassword({
        oldPassword,
        newPassword,
      }),
      {
        success: {
          title: "Success",
          description: "Your password has been updated.",
          position: "top-right",
          isClosable: true,
        },
        error: (errorMessage) => ({
          title: "Password update failed",
          description: `${errorMessage}`,
          position: "top-right",
          isClosable: true,
        }),
        loading: {
          title: "Password updating...",
          description: "Please wait...",
          position: "top-right",
          isClosable: true,
        },
      }
    );

    reset();
    closeModal();
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent marginX={3}>
          <ModalCloseButton />
          <ModalHeader
            fontSize={"lg"}
            textTransform={"uppercase"}
            textAlign={"center"}
            fontFamily={"heading"}
            fontWeight={"extrabold"}
          >
            Update Password
          </ModalHeader>

          <ModalBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
              }}
            >
              <FormInput
                label={"Old Password"}
                type="password"
                errorMessage={errors.oldPassword?.message}
                centerLabel={true}
                register={register("oldPassword")}
                isRequired
                labelStyles={{
                  textAlign: "left",
                  fontSize: "14px",
                }}
                placeholder="..."
                hideFocusBorder={true}
                styles={{
                  borderRadius: "0px",
                  paddingLeft: 5,
                  borderBottomWidth: "1px",
                  borderColor: useColorModeValue(
                    colors.lightTheme,
                    colors.darkTheme
                  ),
                  marginTop: "-6px",
                  borderStyle: "none none solid none",
                }}
              />

              <FormInput
                label={"New Password"}
                type="password"
                errorMessage={errors.newPassword?.message}
                centerLabel={true}
                register={register("newPassword")}
                isRequired
                labelStyles={{
                  marginTop: "10px",
                  textAlign: "left",
                  fontSize: "14px",
                }}
                placeholder="..."
                hideFocusBorder={true}
                styles={{
                  borderRadius: "0px",
                  paddingLeft: 5,
                  borderBottomWidth: "1px",
                  borderColor: useColorModeValue(
                    colors.lightTheme,
                    colors.darkTheme
                  ),
                  marginTop: "-6px",
                  borderStyle: "none none solid none",
                }}
              />

              <FormInput
                label={"Confirm New Password"}
                type="password"
                errorMessage={errors.confirmNewPassword?.message}
                centerLabel={true}
                register={register("confirmNewPassword")}
                isRequired
                labelStyles={{
                  marginTop: "10px",
                  textAlign: "left",
                  fontSize: "14px",
                }}
                placeholder="..."
                hideFocusBorder={true}
                styles={{
                  borderRadius: "0px",
                  paddingLeft: 5,
                  borderBottomWidth: "1px",
                  borderColor: useColorModeValue(
                    colors.lightTheme,
                    colors.darkTheme
                  ),
                  marginTop: "-6px",
                  borderStyle: "none none solid none",
                }}
              />

              <Text
                fontSize={{ base: "xs", md: "sm", lg: "xs" }}
                fontStyle={"italic"}
                color={colors.medium}
                marginTop={2}
                marginBottom={3}
              >
                NB: For anonymity sake your email isn't collected. Confirm your
                password once more as this account can't be gotten back if
                forgotten.
              </Text>

              <Box marginY={2}>
                <AppButton text="Update" type="submit" />
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const PrivacyUpdate = ({ handleClose }: UpdateProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const { updateUserPrivacy } = useUserUpdate();

  const isPrivate = useAppStore().currentUser.isPrivate;
  const userCurrentPrivacy = isPrivate ? "Private" : "Public";
  const userUpdatedPrivacy = isPrivate ? "Public" : "Private";

  const closeModal = () => {
    handleClose();
    onClose();
  };

  const updatePrivacy = async () => {
    return toast.promise(
      updateUserPrivacy({
        isPrivate: !isPrivate,
      }),
      {
        success: {
          title: "Success",
          description: `Your privacy has been set to ${userUpdatedPrivacy}.`,
          position: "top-right",
          isClosable: true,
        },
        error: (errorMessage) => ({
          title: "Privacy update failed",
          description: `${errorMessage}`,
          position: "top-right",
          isClosable: true,
        }),
        loading: {
          title: `Privacy updating to ${userUpdatedPrivacy}...`,
          description: "Please wait...",
          position: "top-right",
        },
      }
    );
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={closeModal}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent marginX={3}>
          <AlertDialogHeader>Update privacy?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {`Your account is currently set to ${userCurrentPrivacy}, are you sure you want to change this to ${userUpdatedPrivacy}?`}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={closeModal}
            >{`Leave as ${userCurrentPrivacy}`}</Button>

            <Button
              colorScheme="yellow"
              ml={3}
              onClick={async () => {
                await updatePrivacy();
                closeModal();
              }}
            >
              {`Update to ${userUpdatedPrivacy}`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const ProfileEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showUpdateModal, setShowUpdateModal] = useState<
    "password" | "privacy" | false
  >(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <HStack
        fontWeight={"bold"}
        fontFamily={"sans-serif"}
        cursor={"pointer"}
        spacing={1}
        _hover={{
          opacity: 0.7,
        }}
        onClick={onOpen}
      >
        <Text>Edit</Text>
        <EditIcon />
      </HStack>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent marginX={3}>
          <AlertDialogHeader>Edit account?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>What do you want to update?</AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onClick={() => {
                setShowUpdateModal("privacy");
                onClose();
              }}
            >
              Privacy
            </Button>

            <Button
              colorScheme="yellow"
              ml={3}
              onClick={() => {
                setShowUpdateModal("password");
                onClose();
              }}
            >
              Password
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {showUpdateModal === "password" ? (
        <PasswordUpdate
          handleClose={() => {
            setShowUpdateModal(false);
            onClose();
          }}
        />
      ) : showUpdateModal === "privacy" ? (
        <PrivacyUpdate
          handleClose={() => {
            setShowUpdateModal(false);
            onClose();
          }}
        />
      ) : null}
    </>
  );
};

export default ProfileEdit;
