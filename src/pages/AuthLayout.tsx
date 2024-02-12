import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import ColorModeSwitch from "../components/ColorModeSwitch";
import useAuth from "../hooks/useAuth";
import useAppStore from "../store";
import { useLoginUser } from "../hooks/useUsers";

const AuthLayout = () => {
  const isLoggedIn = useAppStore().isLoggedIn;
  const setLoggedIn = useAppStore().setLoggedIn;
  const setCurrentUser = useAppStore().setCurrentUser;
  const { logout } = useLoginUser();

  useEffect(() => {
    (async () => setLoggedIn(await useAuth()))();

    if (isLoggedIn) {
      if (!localStorage.getItem("currentUser")) {
        (async () => await logout())();
      } else {
        const userDataFromStorage = localStorage.getItem("currentUser") || "";
        setCurrentUser(JSON.parse(userDataFromStorage));
      }
    }
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
