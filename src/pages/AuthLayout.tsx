import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ColorModeSwitch from "../components/ColorModeSwitch";
import useAuth from "../hooks/useAuth";
import useAppStore from "../store";

const AuthLayout = () => {
  const isLoggedIn = useAppStore().isLoggedIn;
  const setLoggedIn = useAppStore().setLoggedIn;
  const setCurrentUser = useAppStore().setCurrentUser;

  useEffect(() => {
    useAuth()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch(() => {
        setLoggedIn(false);
        setCurrentUser(undefined);
      });
  }, []);

  if (isLoggedIn) return <Navigate to="/" />;

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
