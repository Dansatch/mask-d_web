import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Radio,
  RadioGroup,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { generateUsername } from "friendly-username-generator";
import { RepeatIcon } from "@chakra-ui/icons";

import FormInput from "./FormInput";
import ProfileAvatar from "./ProfileAvatar";
import AppButton from "./AppButton";
import { useRegisterUser } from "../hooks/useUsers";
import colors from "../config/colors";

const schema = z
  .object({
    username: z.string({ required_error: "Username cannot be empty" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .refine((value) => /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value), {
        message:
          "Password must contain at least 1 uppercase letter, 1 symbol, and be at least 8 characters long",
      }),
    confirmPassword: z.string({ required_error: "Password cannot be empty" }),
    isPrivate: z.boolean({
      required_error: "You must choose a privacy setting",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const [isConfirmed, setConfirmed] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const registerUser = useRegisterUser();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const setAccountVisibility = (value: "private" | "public") => {
    if (value === "private") setValue("isPrivate", true);
    else setValue("isPrivate", false);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!isConfirmed) return onOpen();

    async function handleUserRegistration() {
      await registerUser({
        username: data.username,
        password: data.password,
        isPrivate: data.isPrivate,
      });

      const goTo = new URLSearchParams(location.search).get("goTo"); // check for previous route
      return goTo ? navigate(goTo) : navigate("/");
    }

    return toast.promise(handleUserRegistration(), {
      success: () => ({
        title: "Account created successful",
        description: `Welcome ${data.username}`,
        position: "top-right",
        duration: 3000,
        isClosable: true,
      }),
      error: (errorMessage) => ({
        title: "Account creation failed",
        description: `${errorMessage}`,
        position: "top-right",
        isClosable: true,
      }),
      loading: {
        title: "Creating account...",
        description: "Please wait...",
        position: "top-right",
      },
    });
  };

  function reshuffleUsername() {
    const generatedUsername = generateUsername({ useHyphen: false });
    setValue("username", generatedUsername);
  }

  // Pass through to prevent delay
  useEffect(() => {
    if (isConfirmed) {
      onClose();
      handleSubmit(onSubmit)();
    }
  }, [isConfirmed]);

  useEffect(() => {
    reshuffleUsername();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        // height: "100%",
        width: "100%",
      }}
    >
      <VStack
        display={"flex"}
        spacing={2}
        justifyContent={"space-around"}
        maxWidth={"90vw"}
        width={"100%"}
        height={"100%"}
      >
        <ProfileAvatar username={watch("username")} boxSize={"100px"} />

        <FormControl isRequired>
          <FormLabel textAlign={"center"}>Choose username</FormLabel>

          <InputGroup width={"80%"} marginX={"auto"}>
            <Input
              type="text"
              textAlign={"center"}
              borderWidth={"2px"}
              width={"100%"}
              readOnly
              {...register("username")}
            />

            <InputRightElement
              cursor={"pointer"}
              children={<RepeatIcon />}
              onClick={reshuffleUsername}
              _hover={{
                opacity: 0.5,
              }}
            />
          </InputGroup>

          {[
            "For anonymity, usernames and avatars are randomized.",
            "You can change usernames by clicking the refresh icon in the box.",
            "NB: This can't be changed after sign up.",
          ].map((message, index) => (
            <Text
              key={index}
              fontSize={{ base: "xs", md: "sm", lg: "xs" }}
              fontStyle={"italic"}
              color={colors.medium}
            >
              {message}
            </Text>
          ))}
        </FormControl>

        <FormInput
          label={"Password"}
          type="password"
          errorMessage={errors.password?.message}
          centerLabel={true}
          register={register("password")}
          isRequired
        />

        <Box>
          <FormInput
            label={"Confirm Password"}
            type="password"
            errorMessage={errors.confirmPassword?.message}
            centerLabel={true}
            register={register("confirmPassword")}
            isRequired
          />

          <Text
            fontSize={{ base: "xs", md: "sm", lg: "xs" }}
            fontStyle={"italic"}
            color={colors.medium}
          >
            NB: For anonymity sake your email isn't collected. Confirm your
            password once more as this account can't be gotten back if
            forgotten.
          </Text>
        </Box>

        <Box>
          <RadioGroup
            width={"100%"}
            paddingLeft={".5vw"}
            onChange={setAccountVisibility}
            fontFamily={"cursive"}
          >
            <HStack
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text textAlign={"left"} marginRight={2}>
                Account privacy?
              </Text>

              <Radio value={"private"} colorScheme="yellow">
                Private
              </Radio>

              <Radio value={"public"} colorScheme="yellow" defaultChecked>
                Public
              </Radio>
            </HStack>
          </RadioGroup>

          <Text
            fontSize={{ base: "xs", md: "sm", lg: "xs" }}
            fontStyle={"italic"}
            color={colors.medium}
          >
            This determines whether or not your entries would be seen by other
            users or your eyes only. It can be changed later on
          </Text>
        </Box>

        <Box width={"40%"}>
          <AppButton text="Sign up" colorSchemeEnabled={true} type="submit" />
        </Box>

        <Link
          fontStyle={"italic"}
          color={"gray.400"}
          marginTop={-1}
          fontSize={"sm"}
          onClick={() => navigate("/login")}
        >
          Already have an account??
        </Link>
      </VStack>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalContent>
          <ModalBody paddingTop={5}>
            <VStack spacing={5}>
              <Text fontSize={"sm"}>
                Have you confirmed and securely saved your account username and
                password? Please ensure you store this information as the
                username and avatar cannot be changed later on and passwords
                can't be recovered.
              </Text>

              <ProfileAvatar username={watch("username")} boxSize={"100px"} />

              <HStack marginTop={4}>
                <FormInput
                  register={register("username")}
                  type="text"
                  readOnly={true}
                />

                <FormInput
                  register={register("password")}
                  type="password"
                  readOnly={true}
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter paddingTop={1}>
            <HStack>
              <AppButton text="Go Back" handleClick={onClose} />
              <AppButton
                text="Create"
                handleClick={() => {
                  setConfirmed(true);
                }}
              />
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default RegisterForm;
