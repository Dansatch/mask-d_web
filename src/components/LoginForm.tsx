import { Checkbox, HStack, Link, VStack } from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import AppButton from "./AppButton";
import { loginUser } from "../hooks/useUser";

const schema = z.object({
  username: z.string({ required_error: "Username cannot be empty" }),
  password: z.string({ required_error: "Password cannot be empty" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    return await loginUser({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack
        spacing={4}
        justifyContent={"space-evenly"}
        width={"inherit"}
        maxWidth={"90vw"}
        minHeight={"inherit"}
      >
        <FormInput
          label={"Username"}
          type="text"
          errorMessage={errors.username?.message}
          register={register("username")}
          isRequired
        />
        <FormInput
          label={"Password"}
          type="password"
          errorMessage={errors.password?.message}
          register={register("password")}
          isRequired
        />

        <HStack align={"start"} justify={"space-between"} width={"100%"}>
          <Checkbox>Remember me</Checkbox>
          <Link color={"blue.400"}>Can't sign in?</Link>
        </HStack>

        <AppButton text="Login" type="submit" width="100%" />

        <Link fontStyle={"italic"} color={"red.400"} marginTop={-2}>
          Don't have an account??
        </Link>
      </VStack>
    </form>
  );
};

export default LoginForm;
