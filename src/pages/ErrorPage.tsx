import { Box, Heading, Text } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import AppButton from "../components/AppButton";
import colors from "../config/colors";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Box paddingTop={"10vh"}>
      <Heading>
        {isRouteErrorResponse(error) ? "You lost fam??" : "My bad fam"}
      </Heading>

      <Text fontStyle={"italic"} color={colors.medium}>
        {isRouteErrorResponse(error)
          ? "Route doesn't exist"
          : "An unexpected error occured."}
      </Text>

      <Box width={"130px"} marginX={"auto"} marginTop={5}>
        <AppButton
          text="Go to home"
          handleClick={() => navigate("/")}
          colorSchemeEnabled={true}
        />
      </Box>
    </Box>
  );
};

export default ErrorPage;
