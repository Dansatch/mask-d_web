import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Checkbox, HStack, Link, VStack, useToast } from "@chakra-ui/react";
import { useForm, FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "./FormInput";
import AppButton from "./AppButton";
import { useLoginUser } from "../hooks/useUsers";

const schema = z.object({
  username: z.string({ required_error: "Username cannot be empty" }),
  password: z.string({ required_error: "Password cannot be empty" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useLoginUser();

  const onSubmit = async (data: FieldValues) => {
    async function handleUserLogin() {
      await login({
        username: data.username,
        password: data.password,
        rememberMe,
      });

      const goTo = new URLSearchParams(location.search).get("goTo"); // check for previous route
      return goTo ? navigate(goTo) : navigate("/");
    }

    toast.promise(handleUserLogin(), {
      success: () => ({
        title: "Welcome back",
        description: `Welcome back ${data.username}`,
        position: "top-right",
        duration: 3000,
        isClosable: true,
      }),
      error: (errorMessage) => ({
        title: "Login failed",
        description: `${errorMessage}`,
        position: "top-right",
        isClosable: true,
      }),
      loading: {
        title: "Logging in...",
        description: "This might take some time, please wait...",
        position: "top-right",
      },
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
          <Checkbox onChange={(event) => setRememberMe(event.target.checked)}>
            Remember me
          </Checkbox>
          <Link color={"blue.400"}>Can't sign in?</Link>
        </HStack>

        <AppButton text="Login" type="submit" width="100%" />

        <Link
          fontStyle={"italic"}
          color={"red.400"}
          marginTop={-2}
          onClick={() => navigate("/register")}
        >
          Don't have an account??
        </Link>
      </VStack>
    </form>
  );
};

export default LoginForm;
