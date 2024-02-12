import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAppStore from "../store";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useLoginUser } from "../hooks/useUsers";

const AppLayout = () => {
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

  // To make protected route
  if (!isLoggedIn) return <Navigate to="/login" />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
