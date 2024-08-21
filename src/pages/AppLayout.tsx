import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAppStore from "../store";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AppLayout = () => {
  const isLoggedIn = useAppStore().isLoggedIn;
  const setLoggedIn = useAppStore().setLoggedIn;
  const setCurrentUser = useAppStore().setCurrentUser;

  useEffect(() => {
    useAuth()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
        console.log(res);
      })
      .catch(() => {
        setLoggedIn(false);
        setCurrentUser(undefined);
      });
  }, []);

  // To make protected route
  if (!isLoggedIn)
    return (
      <Navigate
        to={{
          pathname: "/login",
          search: `?goTo=${encodeURIComponent(window.location.pathname)}`,
        }}
      />
    );

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
