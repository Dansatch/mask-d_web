import { useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateUsername } from "friendly-username-generator";
import { RepeatIcon } from "@chakra-ui/icons";

import FormInput from "./FormInput";
import colors from "../config/colors";
import AppButton from "./AppButton";

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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  function reshuffleUsername() {
    const generatedUsername = generateUsername({ useHyphen: false });
    setValue("username", generatedUsername);
  }

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
            "For anonymity, usernames are randomized.",
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

        <Box width={"40%"}>
          {/* <SubmitButton label={"Sign up"} /> */}
          <AppButton text="Sign up" colorSchemeEnabled={true} type="submit" />
        </Box>

        <Link
          fontStyle={"italic"}
          color={"gray.400"}
          marginTop={-1}
          fontSize={"sm"}
        >
          Already have an account??
        </Link>
      </VStack>
    </form>
  );
};

export default RegisterForm;
