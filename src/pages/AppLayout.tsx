import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";

const AppLayout = () => {
  // To make protected route
  if (!useAuth()) return <Navigate to="/login" />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default AppLayout;
