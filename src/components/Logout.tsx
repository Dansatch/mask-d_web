import { logoutUser } from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    handleLogout();
  }, []);
};

export default Logout;
