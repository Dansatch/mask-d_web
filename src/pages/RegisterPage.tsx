import { Box, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import backgroundImage from "../assets/8.jpg";
import colors from "../config/colors";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const colorTheme = useColorModeValue(colors.lightTheme, colors.darkTheme);

  return (
    <VStack
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      // marginY={{ base: 4, sm: 0 }}
      _before={{
        content: '""',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity:
          backgroundColor === "gray.800"
            ? { base: 0.03, lg: 0.02 }
            : { base: 0.08, md: 0.05, lg: 0.04 },
        zIndex: -1,
      }}
    >
      <Text
        position={"relative"}
        fontFamily={"cursive"}
        color={colorTheme}
        fontSize={"30px"}
      >
        M'D
      </Text>

      <Box>
        <Text
          textTransform={"uppercase"}
          marginBottom={2}
          color={colorTheme}
          fontSize={"lg"}
          fontWeight={"extrabold"}
          fontFamily={"sans-serif"}
        >
          Create Account
        </Text>

        <Box
          maxWidth={"90vw"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius="5px"
          boxShadow={`1px 2px 10px ${colorTheme}`}
          padding={{ base: "1rem", lg: "1.5rem" }}
          width={{ base: "400px", md: "500px", lg: "400px" }}
          minHeight={{ base: "400px", md: "500px", lg: "400px" }}
          bg={backgroundColor}
        >
          <RegisterForm />
        </Box>
      </Box>

      {/* Boxes for space at bottom */}
      <Box />

      <Box display={{ base: "flex", xl: "none" }} />
    </VStack>
  );
};

export default RegisterPage;
