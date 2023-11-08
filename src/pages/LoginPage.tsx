import { Box, Image, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import logo from "../assets/1DE.png";
import backgroundImage from "../assets/8.jpg";
import colors from "../config/colors";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const backgroundColor = useColorModeValue("gray.100", "gray.800");
  const colorTheme = useColorModeValue(colors.lightTheme, colors.darkTheme);

  return (
    <VStack
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      justifyContent={"space-evenly"}
      alignItems={"center"}
      _before={{
        content: '""',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        opacity: backgroundColor === "gray.800" ? 0.04 : 0.06,
        zIndex: -1,
      }}
    >
      <Text
        position={"relative"}
        fontFamily={"cursive"}
        color={colors.darkTheme}
        fontSize={"30px"}
      >
        M'D
      </Text>

      <Box
        maxWidth={"90vw"}
        borderRadius="5px"
        boxShadow={`1px 2px 10px ${colorTheme}`}
        padding={{ base: "1rem", lg: "1.5rem" }}
        width={{ base: "400px", md: "500px", lg: "400px" }}
        minHeight={{ base: "300px", md: "400px", lg: "300px" }}
        bg={backgroundColor}
      >
        <Image
          src={logo}
          boxSize="120px"
          borderRadius="50%"
          boxShadow={`1px 1px 5px ${colorTheme}`}
          marginX="auto"
          marginTop="-50px"
        />

        <LoginForm />
      </Box>

      {/* Boxes for space at bottom */}
      <Box />

      <Box display={{ base: "flex", xl: "none" }} />
    </VStack>
  );
};

export default LoginPage;
