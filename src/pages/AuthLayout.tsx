import { Navigate, Outlet } from "react-router-dom";
import ColorModeSwitch from "../components/ColorModeSwitch";
import useAuth from "../hooks/useAuth";
import { Box } from "@chakra-ui/react";

const AuthLayout = () => {
  if (useAuth()) return <Navigate to="/" />;

  return (
    <>
      <Box position={"fixed"} left={2} top={2}>
        <ColorModeSwitch singleIcon={true} />
      </Box>

      <Outlet />
    </>
  );
};

export default AuthLayout;
