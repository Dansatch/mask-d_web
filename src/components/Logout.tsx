import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../hooks/useUsers";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useLoginUser();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // navigate to login
  };

  useEffect(() => {
    (async () => {
      await handleLogout();
    })();
  }, []);

  return <div />;
};

export default Logout;
