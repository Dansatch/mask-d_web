import { Box, Heading } from "@chakra-ui/react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import AppButton from "../components/AppButton";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <Box paddingTop={"10vh"}>
      <Heading>
        {isRouteErrorResponse(error)
          ? "You lost fam??"
          : "An unexpected error occured."}
      </Heading>

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
